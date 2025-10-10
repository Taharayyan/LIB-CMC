import { Meeting, User } from '../models/index.js';

export const getAllMeetings = async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const offset = (page - 1) * limit;

    const whereClause = {};
    if (status) whereClause.status = status;

    const meetings = await Meeting.findAndCountAll({
      where: whereClause,
      include: [{
        model: User,
        as: 'creator',
        attributes: ['username', 'avatar_url']
      }],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['scheduled_at', 'ASC']]
    });

    res.json({
      meetings: meetings.rows,
      totalCount: meetings.count,
      totalPages: Math.ceil(meetings.count / limit),
      currentPage: parseInt(page)
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching meetings', error: error.message });
  }
};

export const getMeetingById = async (req, res) => {
  try {
    const { id } = req.params;
    const meeting = await Meeting.findByPk(id, {
      include: [{
        model: User,
        as: 'creator',
        attributes: ['username', 'avatar_url']
      }]
    });

    if (!meeting) {
      return res.status(404).json({ message: 'Meeting not found' });
    }

    res.json(meeting);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching meeting', error: error.message });
  }
};

export const createMeeting = async (req, res) => {
  try {
    const { title, description, scheduled_at, duration } = req.body;
    const created_by = req.user.userId;

    const meeting = await Meeting.create({
      title,
      description,
      scheduled_at,
      duration,
      created_by,
      room_url: `room_${Date.now()}`
    });

    res.status(201).json({ message: 'Meeting created successfully', meeting });
  } catch (error) {
    res.status(500).json({ message: 'Error creating meeting', error: error.message });
  }
};

export const updateMeeting = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, scheduled_at, duration, status } = req.body;

    const meeting = await Meeting.findByPk(id);
    if (!meeting) {
      return res.status(404).json({ message: 'Meeting not found' });
    }

    // Check if user created the meeting or is admin
    if (meeting.created_by !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update this meeting' });
    }

    await meeting.update({ title, description, scheduled_at, duration, status });
    res.json({ message: 'Meeting updated successfully', meeting });
  } catch (error) {
    res.status(500).json({ message: 'Error updating meeting', error: error.message });
  }
};

export const deleteMeeting = async (req, res) => {
  try {
    const { id } = req.params;

    const meeting = await Meeting.findByPk(id);
    if (!meeting) {
      return res.status(404).json({ message: 'Meeting not found' });
    }

    // Check if user created the meeting or is admin
    if (meeting.created_by !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this meeting' });
    }

    await meeting.destroy();
    res.json({ message: 'Meeting deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting meeting', error: error.message });
  }
};
