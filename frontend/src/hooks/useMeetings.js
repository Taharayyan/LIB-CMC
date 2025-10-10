import { useState, useCallback } from 'react';
import { meetingService } from '../services/meetingService';

export const useMeetings = () => {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMeetings = useCallback(async (filters = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await meetingService.getAllMeetings(filters);
      setMeetings(response.meetings || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const getMeetingById = useCallback(async (id) => {
    try {
      const meeting = await meetingService.getMeetingById(id);
      return meeting;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  const createMeeting = useCallback(async (meetingData) => {
    try {
      const newMeeting = await meetingService.createMeeting(meetingData);
      setMeetings(prev => [newMeeting, ...prev]);
      return newMeeting;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  const updateMeeting = useCallback(async (id, meetingData) => {
    try {
      const updatedMeeting = await meetingService.updateMeeting(id, meetingData);
      setMeetings(prev => prev.map(meeting => meeting.id === id ? updatedMeeting : meeting));
      return updatedMeeting;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  const deleteMeeting = useCallback(async (id) => {
    try {
      await meetingService.deleteMeeting(id);
      setMeetings(prev => prev.filter(meeting => meeting.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  return {
    meetings,
    loading,
    error,
    fetchMeetings,
    getMeetingById,
    createMeeting,
    updateMeeting,
    deleteMeeting
  };
};
