import { io } from 'socket.io-client';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';

class SocketService {
  constructor() {
    this.socket = null;
  }

  connect() {
    if (!this.socket) {
      this.socket = io(API_BASE_URL);
    }
    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  joinMeeting(meetingId) {
    if (this.socket) {
      this.socket.emit('join_meeting', meetingId);
    }
  }

  leaveMeeting(meetingId) {
    if (this.socket) {
      this.socket.emit('leave_meeting', meetingId);
    }
  }

  sendMessage(meetingId, message) {
    if (this.socket) {
      this.socket.emit('send_message', { meetingId, message });
    }
  }

  onMessage(callback) {
    if (this.socket) {
      this.socket.on('new_message', callback);
    }
  }

  onUserJoined(callback) {
    if (this.socket) {
      this.socket.on('user_joined', callback);
    }
  }

  onUserLeft(callback) {
    if (this.socket) {
      this.socket.on('user_left', callback);
    }
  }

  onTyping(callback) {
    if (this.socket) {
      this.socket.on('typing', callback);
    }
  }

  onStopTyping(callback) {
    if (this.socket) {
      this.socket.on('stop_typing', callback);
    }
  }
}

export const socketService = new SocketService();
