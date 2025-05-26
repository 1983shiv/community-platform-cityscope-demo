# Community Platform

A modern community platform built with microservices architecture, allowing users to share posts, interact with content, and build connections.

## 🚀 Quick Start

### Prerequisites

- Node.js (v20 or later)
- Docker and Docker Compose
- MongoDB (if running services locally)
- Git

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Set up environment variables for each service:

Auth Service (.env):
```env
PORT=3001
MONGO_URI=mongodb://localhost:27017/auth-service
JWT_SECRET=your-secret-key
```

Post Service (.env):
```env
PORT=3002
MONGO_URI=mongodb://localhost:27017/post-service
AUTH_SERVICE_URL=http://localhost:3001
```

Reaction Service (.env):
```env
PORT=3003
MONGO_URI=mongodb://localhost:27017/reaction-service
AUTH_SERVICE_URL=http://localhost:3001
```

3. Run with Docker (recommended):
```bash
docker-compose up --build
```

OR run services individually:
```bash
# In separate terminals
cd auth-service && npm install && npm run dev
cd post-service && npm install && npm run dev
cd reaction-service && npm install && npm run dev
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_POST_SERVICE_URL=http://localhost:3002
NEXT_PUBLIC_REACTION_SERVICE_URL=http://localhost:3003
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🎯 Current Features

### Authentication
- ✅ User registration
- ✅ User login
- ✅ JWT-based authentication
- ✅ Profile viewing

### Posts
- ✅ Create text posts
- ✅ Image upload support
- ✅ View all posts
- ✅ Filter posts by type and location

### Reactions (Work in Progress)
- ✅ Basic reaction system
- ❌ Advanced interaction features

## 🚧 Known Limitations & Work in Progress

1. Post Creation:
   - Image upload functionality needs optimization
   - Rich text editor integration pending
   - Post editing and deletion features pending

2. Frontend UI:
   - Basic UI implementation for demo
   - Responsive design needs improvement
   - Loading states and error handling need enhancement

3. User Experience:
   - Real-time updates not implemented
   - Pagination pending
   - Search functionality pending

## 🎨 Future Development Opportunities

1. Enhanced User Features:
   - User profile customization
   - Follow/Following system
   - Direct messaging
   - User notifications
   - Email verification
   - Password recovery

2. Content Management:
   - Rich text editor
   - Multiple image uploads
   - Video support
   - Post categories and tags
   - Post sharing
   - Save/bookmark posts
   - Draft posts

3. Social Features:
   - Communities/Groups
   - Events
   - Live chat
   - Comment threading
   - @mentions and #hashtags
   - Content moderation tools

4. Technical Improvements:
   - Real-time updates using WebSocket
   - Content caching
   - CDN integration
   - Analytics dashboard
   - Admin panel
   - Mobile app version
   - API rate limiting
   - Enhanced security features

## 🔒 Security Notes

- Current implementation uses basic JWT authentication
- Environment variables should be properly secured
- Production deployment needs additional security measures

## 💻 API Documentation

### Auth Service (Port 3001)
- POST /auth/signup - Register new user
- POST /auth/login - User login
- GET /auth/profile/:userId - Get user profile

### Post Service (Port 3002)
- POST /posts - Create new post
- GET /posts - Get all posts
- GET /posts/user/:userId - Get user's posts

### Reaction Service (Port 3003)
- POST /reactions - Add reaction to post
- GET /reactions/post/:postId - Get post reactions

## 🤝 Contributing

This project is open to improvements and contributions. Please follow these steps:
1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## ⚖️ License

MIT License - feel free to use this project for learning and development


---

**Note**: This is a demo version with basic functionality implemented. For production use, additional features, security measures, and optimizations would be necessary.