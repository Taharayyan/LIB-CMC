import request from 'supertest';
import app from '../../backend/app.js';

describe('Book Endpoints', () => {
  let authToken;
  let userId;

  beforeEach(async () => {
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

  describe('GET /api/books', () => {
    it('should get all books without authentication', async () => {
      const response = await request(app)
        .get('/api/books')
        .expect(200);

      expect(response.body).toHaveProperty('books');
      expect(response.body).toHaveProperty('totalCount');
      expect(response.body).toHaveProperty('totalPages');
      expect(response.body).toHaveProperty('currentPage');
    });

    it('should filter books by category', async () => {
      const response = await request(app)
        .get('/api/books?category=Fiction')
        .expect(200);

      expect(response.body).toHaveProperty('books');
    });

    it('should search books by title or author', async () => {
      const response = await request(app)
        .get('/api/books?search=test')
        .expect(200);

      expect(response.body).toHaveProperty('books');
    });
  });

  describe('POST /api/books', () => {
    it('should create a book with valid data', async () => {
      const bookData = {
        title: 'Test Book',
        author: 'Test Author',
        category: 'Fiction',
        description: 'A test book'
      };

      const response = await request(app)
        .post('/api/books')
        .set('Authorization', `Bearer ${authToken}`)
        .field('title', bookData.title)
        .field('author', bookData.author)
        .field('category', bookData.category)
        .field('description', bookData.description)
        .expect(201);

      expect(response.body).toHaveProperty('message', 'Book created successfully');
      expect(response.body).toHaveProperty('book');
    });

    it('should return 401 without authentication', async () => {
      const bookData = {
        title: 'Test Book',
        author: 'Test Author',
        category: 'Fiction'
      };

      await request(app)
        .post('/api/books')
        .send(bookData)
        .expect(401);
    });

    it('should return 400 for invalid data', async () => {
      const bookData = {
        title: '', // Invalid: empty title
        author: 'Test Author',
        category: 'Fiction'
      };

      const response = await request(app)
        .post('/api/books')
        .set('Authorization', `Bearer ${authToken}`)
        .send(bookData)
        .expect(400);

      expect(response.body).toHaveProperty('message', 'Validation error');
    });
  });

  describe('GET /api/books/:id', () => {
    it('should get a book by ID', async () => {
      // First create a book
      const bookData = {
        title: 'Test Book',
        author: 'Test Author',
        category: 'Fiction',
        description: 'A test book'
      };

      const createResponse = await request(app)
        .post('/api/books')
        .set('Authorization', `Bearer ${authToken}`)
        .field('title', bookData.title)
        .field('author', bookData.author)
        .field('category', bookData.category)
        .field('description', bookData.description);

      const bookId = createResponse.body.book.id;

      // Then get the book
      const response = await request(app)
        .get(`/api/books/${bookId}`)
        .expect(200);

      expect(response.body).toHaveProperty('id', bookId);
      expect(response.body).toHaveProperty('title', bookData.title);
    });

    it('should return 404 for non-existent book', async () => {
      const fakeId = '00000000-0000-0000-0000-000000000000';
      
      await request(app)
        .get(`/api/books/${fakeId}`)
        .expect(404);
    });
  });
});
