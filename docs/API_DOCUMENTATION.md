# CMC Nouacour Library API Documentation

## Base URL
```
http://localhost:4000/api
```

## Authentication
Most endpoints require authentication via JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## Endpoints

### Authentication

#### POST /auth/register
Register a new user.

**Request Body:**
```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "message": "User created successfully",
  "token": "jwt-token",
  "user": {
    "id": "uuid",
    "username": "string",
    "email": "string",
    "role": "user"
  }
}
```

#### POST /auth/login
Login with email and password.

**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "jwt-token",
  "user": {
    "id": "uuid",
    "username": "string",
    "email": "string",
    "role": "user"
  }
}
```

#### POST /auth/logout
Logout user.

**Response:**
```json
{
  "message": "Logout successful"
}
```

### Books

#### GET /books
Get all books with optional filtering.

**Query Parameters:**
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 10)
- `category` (string): Filter by category
- `search` (string): Search in title and author

**Response:**
```json
{
  "books": [
    {
      "id": "uuid",
      "title": "string",
      "author": "string",
      "category": "string",
      "description": "string",
      "pdf_path": "string",
      "cover_image": "string",
      "file_size": 12345,
      "downloads_count": 10,
      "created_at": "2024-01-01T00:00:00Z",
      "uploader": {
        "username": "string",
        "avatar_url": "string"
      }
    }
  ],
  "totalCount": 100,
  "totalPages": 10,
  "currentPage": 1
}
```

#### GET /books/:id
Get book by ID.

**Response:**
```json
{
  "id": "uuid",
  "title": "string",
  "author": "string",
  "category": "string",
  "description": "string",
  "pdf_path": "string",
  "cover_image": "string",
  "file_size": 12345,
  "downloads_count": 10,
  "created_at": "2024-01-01T00:00:00Z",
  "uploader": {
    "username": "string",
    "avatar_url": "string"
  }
}
```

#### POST /books
Create a new book (requires authentication).

**Request Body (multipart/form-data):**
- `title` (string): Book title
- `author` (string): Book author
- `category` (string): Book category
- `description` (string): Book description
- `pdf` (file): PDF file
- `cover` (file): Cover image (optional)

**Response:**
```json
{
  "message": "Book created successfully",
  "book": {
    "id": "uuid",
    "title": "string",
    "author": "string",
    "category": "string",
    "description": "string",
    "pdf_path": "string",
    "cover_image": "string",
    "file_size": 12345,
    "uploaded_by": "uuid",
    "created_at": "2024-01-01T00:00:00Z"
  }
}
```

### Meetings

#### GET /meetings
Get all meetings with optional filtering.

**Query Parameters:**
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 10)
- `status` (string): Filter by status (scheduled, ongoing, completed, cancelled)

**Response:**
```json
{
  "meetings": [
    {
      "id": "uuid",
      "title": "string",
      "description": "string",
      "scheduled_at": "2024-01-01T00:00:00Z",
      "duration": 60,
      "room_url": "string",
      "status": "scheduled",
      "created_at": "2024-01-01T00:00:00Z",
      "creator": {
        "username": "string",
        "avatar_url": "string"
      }
    }
  ],
  "totalCount": 50,
  "totalPages": 5,
  "currentPage": 1
}
```

#### POST /meetings
Create a new meeting (requires authentication).

**Request Body:**
```json
{
  "title": "string",
  "description": "string",
  "scheduled_at": "2024-01-01T00:00:00Z",
  "duration": 60
}
```

**Response:**
```json
{
  "message": "Meeting created successfully",
  "meeting": {
    "id": "uuid",
    "title": "string",
    "description": "string",
    "scheduled_at": "2024-01-01T00:00:00Z",
    "duration": 60,
    "room_url": "string",
    "status": "scheduled",
    "created_by": "uuid",
    "created_at": "2024-01-01T00:00:00Z"
  }
}
```

### Chat

#### GET /chat/:meetingId
Get chat messages for a meeting.

**Query Parameters:**
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 50)

**Response:**
```json
{
  "messages": [
    {
      "id": "uuid",
      "meeting_id": "uuid",
      "user_id": "uuid",
      "message": "string",
      "message_type": "text",
      "created_at": "2024-01-01T00:00:00Z",
      "user": {
        "username": "string",
        "avatar_url": "string"
      }
    }
  ],
  "totalCount": 25,
  "totalPages": 1,
  "currentPage": 1
}
```

#### POST /chat/:meetingId
Send a message to a meeting.

**Request Body:**
```json
{
  "message": "string",
  "message_type": "text"
}
```

**Response:**
```json
{
  "message": "Message sent successfully",
  "chatMessage": {
    "id": "uuid",
    "meeting_id": "uuid",
    "user_id": "uuid",
    "message": "string",
    "message_type": "text",
    "created_at": "2024-01-01T00:00:00Z",
    "user": {
      "username": "string",
      "avatar_url": "string"
    }
  }
}
```

### Users

#### GET /users/profile
Get current user profile (requires authentication).

**Response:**
```json
{
  "id": "uuid",
  "username": "string",
  "email": "string",
  "role": "user",
  "avatar_url": "string",
  "created_at": "2024-01-01T00:00:00Z"
}
```

#### PUT /users/profile
Update current user profile (requires authentication).

**Request Body:**
```json
{
  "username": "string",
  "email": "string",
  "avatar_url": "string"
}
```

**Response:**
```json
{
  "message": "Profile updated successfully",
  "user": {
    "id": "uuid",
    "username": "string",
    "email": "string",
    "role": "user",
    "avatar_url": "string"
  }
}
```

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request
```json
{
  "message": "Validation error",
  "details": [
    {
      "field": "email",
      "message": "Email is required"
    }
  ]
}
```

### 401 Unauthorized
```json
{
  "message": "Access token required"
}
```

### 403 Forbidden
```json
{
  "message": "Insufficient permissions"
}
```

### 404 Not Found
```json
{
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "message": "Internal server error"
}
```

## Socket.IO Events

### Client to Server

#### join_meeting
Join a meeting room.
```javascript
socket.emit('join_meeting', meetingId);
```

#### leave_meeting
Leave a meeting room.
```javascript
socket.emit('leave_meeting', meetingId);
```

#### send_message
Send a message to a meeting.
```javascript
socket.emit('send_message', { meetingId, message });
```

### Server to Client

#### connected
Socket connection established.
```javascript
socket.on('connected', (data) => {
  console.log('Connected with ID:', data.id);
});
```

#### new_message
New message received.
```javascript
socket.on('new_message', (message) => {
  console.log('New message:', message);
});
```

#### user_joined
User joined the meeting.
```javascript
socket.on('user_joined', (user) => {
  console.log('User joined:', user);
});
```

#### user_left
User left the meeting.
```javascript
socket.on('user_left', (user) => {
  console.log('User left:', user);
});
```
