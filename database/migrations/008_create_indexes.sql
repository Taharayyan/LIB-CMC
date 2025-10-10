-- Migration: Create additional indexes
-- Version: 008
-- Description: Additional performance indexes

-- Composite indexes for common queries
CREATE INDEX idx_books_category_created_at ON books(category, created_at DESC);
CREATE INDEX idx_meetings_status_scheduled_at ON meetings(status, scheduled_at ASC);
CREATE INDEX idx_chat_messages_meeting_created ON chat_messages(meeting_id, created_at ASC);
CREATE INDEX idx_notifications_user_read_created ON notifications(user_id, read, created_at DESC);

-- Partial indexes for active records
CREATE INDEX idx_meetings_active ON meetings(scheduled_at) WHERE status IN ('scheduled', 'ongoing');
CREATE INDEX idx_notifications_unread ON notifications(user_id, created_at DESC) WHERE read = FALSE;
