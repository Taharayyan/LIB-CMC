import api from './api';

export const chatService = {
  getMessages: async (meetingId, params = {}) => {
    const response = await api.get(`/chat/${meetingId}`, { params });
    return response.data;
  },

  sendMessage: async (meetingId, messageData) => {
    const response = await api.post(`/chat/${meetingId}`, messageData);
    return response.data.chatMessage;
  },

  deleteMessage: async (messageId) => {
    const response = await api.delete(`/chat/${messageId}`);
    return response.data;
  }
};
