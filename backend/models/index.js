import User from './User.js';
import Book from './Book.js';
import Meeting from './Meeting.js';
import ChatMessage from './ChatMessage.js';
import Bookmark from './Bookmark.js';

// Define associations
User.hasMany(Book, { foreignKey: 'uploaded_by', as: 'uploadedBooks' });
Book.belongsTo(User, { foreignKey: 'uploaded_by', as: 'uploader' });

User.hasMany(Meeting, { foreignKey: 'created_by', as: 'createdMeetings' });
Meeting.belongsTo(User, { foreignKey: 'created_by', as: 'creator' });

Meeting.hasMany(ChatMessage, { foreignKey: 'meeting_id', as: 'messages' });
ChatMessage.belongsTo(Meeting, { foreignKey: 'meeting_id', as: 'meeting' });

User.hasMany(ChatMessage, { foreignKey: 'user_id', as: 'messages' });
ChatMessage.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

User.belongsToMany(Book, { through: Bookmark, as: 'bookmarkedBooks' });
Book.belongsToMany(User, { through: Bookmark, as: 'bookmarkedBy' });

export {
  User,
  Book,
  Meeting,
  ChatMessage,
  Bookmark
};
