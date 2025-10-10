import { ChatMessage, User, Meeting } from '../models/index.js';

export const getChatMessages = async (req, res) => {
  try {
    const { meetingId } = req.params;
    const { page = 1, limit = 50 } = req.query;
    const offset = (page - 1) * limit;

    const messages = await ChatMessage.findAndCountAll({
      where: { meeting_id: meetingId },
      include: [{
        model: User,
        as: 'user',
        attributes: ['username', 'avatar_url']
      }],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['created_at', 'ASC']]
    });

    res.json({
      messages: messages.rows,
      totalCount: messages.count,
      totalPages: Math.ceil(messages.count / limit),
      currentPage: parseInt(page)
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching messages', error: error.message });
  }
};

export const createChatMessage = async (req, res) => {
  try {
    const { meetingId } = req.params;
    const { message, message_type = 'text' } = req.body;
    const user_id = req.user.userId;

    // Verify meeting exists
    const meeting = await Meeting.findByPk(meetingId);
    if (!meeting) {
      return res.status(404).json({ message: 'Meeting not found' });
    }

    const chatMessage = await ChatMessage.create({
      meeting_id: meetingId,
      user_id,
      message,
      message_type
    });

    // Include user info in response
    const messageWithUser = await ChatMessage.findByPk(chatMessage.id, {
      include: [{
        model: User,
        as: 'user',
        attributes: ['username', 'avatar_url']
      }]
    });

    res.status(201).json({ message: 'Message sent successfully', chatMessage: messageWithUser });
  } catch (error) {
    res.status(500).json({ message: 'Error sending message', error: error.message });
  }
};

export const deleteChatMessage = async (req, res) => {
  try {
    const { messageId } = req.params;

    const chatMessage = await ChatMessage.findByPk(messageId);
    if (!chatMessage) {
      return res.status(404).json({ message: 'Message not found' });
    }

    // Check if user owns the message or is admin
    if (chatMessage.user_id !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this message' });
    }

    await chatMessage.destroy();
    res.json({ message: 'Message deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting message', error: error.message });
  }
};
