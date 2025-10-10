import api from './api';

export const meetingService = {
  getAllMeetings: async (params = {}) => {
    const response = await api.get('/meetings', { params });
    return response.data;
  },

  getMeetingById: async (id) => {
    const response = await api.get(`/meetings/${id}`);
    return response.data;
  },

  createMeeting: async (meetingData) => {
    const response = await api.post('/meetings', meetingData);
    return response.data.meeting;
  },

  updateMeeting: async (id, meetingData) => {
    const response = await api.put(`/meetings/${id}`, meetingData);
    return response.data.meeting;
  },

  deleteMeeting: async (id) => {
    const response = await api.delete(`/meetings/${id}`);
    return response.data;
  }
};
