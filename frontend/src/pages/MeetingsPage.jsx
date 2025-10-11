import React, { useState, useEffect } from "react";
import { useMeetings } from "../hooks/useMeetings";
import CreateMeeting from "../components/Meeting/CreateMeeting";
import MeetingList from "../components/Meeting/MeetingList";

const MeetingsPage = () => {
  const { meetings, loading, error, fetchMeetings } = useMeetings();
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    fetchMeetings();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-secondary-600 mx-auto"></div>
          <p className="mt-4 text-gray-700 text-lg font-medium">
            Loading meetings...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center">
        <div className="card max-w-md">
          <p className="text-red-600 text-center">
            ⚠️ Error loading meetings: {error}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10 flex flex-col sm:flex-row justify-between items-center gap-6 animate-fade-in">
          <div className="text-center sm:text-left">
            <h1 className="text-5xl font-bold gradient-text mb-3">
              🗓️ Meetings
            </h1>
            <p className="text-xl text-gray-600">
              Schedule and join virtual meetings
            </p>
          </div>
          <button
            onClick={() => setShowCreateForm(true)}
            className="btn-primary text-lg px-8 py-3 whitespace-nowrap"
          >
            ➕ Create Meeting
          </button>
        </div>

        {showCreateForm && (
          <div className="animate-slide-up mb-8">
            <CreateMeeting
              onClose={() => setShowCreateForm(false)}
              onSuccess={() => {
                setShowCreateForm(false);
                fetchMeetings();
              }}
            />
          </div>
        )}

        <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <MeetingList meetings={meetings} />
        </div>
      </div>
    </div>
  );
};

export default MeetingsPage;
