import React, { useState, useEffect } from 'react';
import { useMeetings } from '../hooks/useMeetings';
import CreateMeeting from '../components/Meeting/CreateMeeting';
import MeetingList from '../components/Meeting/MeetingList';

const MeetingsPage = () => {
  const { meetings, loading, error, fetchMeetings } = useMeetings();
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    fetchMeetings();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading meetings...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">Error loading meetings: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Meetings</h1>
            <p className="mt-2 text-gray-600">Schedule and join virtual meetings</p>
          </div>
          <button
            onClick={() => setShowCreateForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium"
          >
            Create Meeting
          </button>
        </div>

        {showCreateForm && (
          <CreateMeeting
            onClose={() => setShowCreateForm(false)}
            onSuccess={() => {
              setShowCreateForm(false);
              fetchMeetings();
            }}
          />
        )}

        <MeetingList meetings={meetings} />
      </div>
    </div>
  );
};

export default MeetingsPage;
