import request from 'supertest';
import app from '../../backend/app.js';

describe('API Integration Tests', () => {
  let authToken;
  let userId;
  let bookId;
  let meetingId;

  beforeAll(async () => {
    // Register and login a test user
    const registerResponse = await request(app)
      .post('/api/auth/register')
      .send({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
      });

    authToken = registerResponse.body.token;
    userId = registerResponse.body.user.id;
  });

  describe('Complete User Workflow', () => {
    it('should allow user to create, view, and manage books', async () => {
      // Create a book
      const bookData = {
        title: 'Integration Test Book',
        author: 'Test Author',
        category: 'Fiction',
        description: 'A book for integration testing'
      };

      const createBookResponse = await request(app)
        .post('/api/books')
        .set('Authorization', `Bearer ${authToken}`)
        .field('title', bookData.title)
        .field('author', bookData.author)
        .field('category', bookData.category)
        .field('description', bookData.description)
        .expect(201);

      bookId = createBookResponse.body.book.id;

      // View the book
      const getBookResponse = await request(app)
        .get(`/api/books/${bookId}`)
        .expect(200);

      expect(getBookResponse.body.title).toBe(bookData.title);

      // Update the book
      const updateData = {
        title: 'Updated Integration Test Book',
        author: 'Updated Test Author',
        category: 'Non-Fiction',
        description: 'Updated description'
      };

      const updateBookResponse = await request(app)
        .put(`/api/books/${bookId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(updateData)
        .expect(200);

      expect(updateBookResponse.body.book.title).toBe(updateData.title);

      // Delete the book
      await request(app)
        .delete(`/api/books/${bookId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);
    });

    it('should allow user to create and manage meetings', async () => {
      // Create a meeting
      const meetingData = {
        title: 'Integration Test Meeting',
        description: 'A meeting for integration testing',
        scheduled_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // Tomorrow
        duration: 60
      };

      const createMeetingResponse = await request(app)
        .post('/api/meetings')
        .set('Authorization', `Bearer ${authToken}`)
        .send(meetingData)
        .expect(201);

      meetingId = createMeetingResponse.body.meeting.id;

      // View the meeting
      const getMeetingResponse = await request(app)
        .get(`/api/meetings/${meetingId}`)
        .expect(200);

      expect(getMeetingResponse.body.title).toBe(meetingData.title);

      // Update the meeting
      const updateData = {
        title: 'Updated Integration Test Meeting',
        description: 'Updated description',
        scheduled_at: meetingData.scheduled_at,
        duration: 90
      };

      const updateMeetingResponse = await request(app)
        .put(`/api/meetings/${meetingId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(updateData)
        .expect(200);

      expect(updateMeetingResponse.body.meeting.duration).toBe(90);

      // Delete the meeting
      await request(app)
        .delete(`/api/meetings/${meetingId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);
    });

    it('should allow user to send and receive chat messages', async () => {
      // Create a meeting for chat
      const meetingData = {
        title: 'Chat Test Meeting',
        description: 'A meeting for chat testing',
        scheduled_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        duration: 60
      };

      const createMeetingResponse = await request(app)
        .post('/api/meetings')
        .set('Authorization', `Bearer ${authToken}`)
        .send(meetingData)
        .expect(201);

      const chatMeetingId = createMeetingResponse.body.meeting.id;

      // Send a message
      const messageData = {
        message: 'Hello, this is a test message',
        message_type: 'text'
      };

      const sendMessageResponse = await request(app)
        .post(`/api/chat/${chatMeetingId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(messageData)
        .expect(201);

      expect(sendMessageResponse.body.chatMessage.message).toBe(messageData.message);

      // Get messages
      const getMessagesResponse = await request(app)
        .get(`/api/chat/${chatMeetingId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(getMessagesResponse.body.messages).toHaveLength(1);
      expect(getMessagesResponse.body.messages[0].message).toBe(messageData.message);

      // Clean up
      await request(app)
        .delete(`/api/meetings/${chatMeetingId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);
    });
  });

  describe('Error Handling', () => {
    it('should handle invalid authentication gracefully', async () => {
      const response = await request(app)
        .get('/api/users/profile')
        .expect(401);

      expect(response.body).toHaveProperty('message', 'Access token required');
    });

    it('should handle invalid routes gracefully', async () => {
      const response = await request(app)
        .get('/api/invalid-route')
        .expect(404);

      expect(response.body).toHaveProperty('message', 'Route not found');
    });

    it('should handle malformed JSON gracefully', async () => {
      const response = await request(app)
        .post('/api/books')
        .set('Authorization', `Bearer ${authToken}`)
        .set('Content-Type', 'application/json')
        .send('invalid json')
        .expect(400);
    });
  });
});
