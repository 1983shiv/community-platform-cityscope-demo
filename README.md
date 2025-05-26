# Community Platform Backend Services

A robust microservices-based backend architecture for a community platform, providing essential services for user authentication, content management, and social interactions. This backend system is designed to support various frontend implementations.

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

### Testing the Services

You can test the backend services using tools like Thunder Client, Postman, or curl:

1. First, start the services:
```bash
cd backend
docker-compose up --build
```

2. Test the Auth Service (http://localhost:3001):
```bash
# Register a new user
curl -X POST http://localhost:3001/auth/signup -H "Content-Type: application/json" -d "{\"username\":\"testuser\",\"email\":\"test@example.com\",\"password\":\"password123\",\"location\":\"New York\"}"

# Login
curl -X POST http://localhost:3001/auth/login -H "Content-Type: application/json" -d "{\"email\":\"test@example.com\",\"password\":\"password123\"}"
```

3. Test the Post Service (http://localhost:3002):
```bash
# Create a post (replace TOKEN with the token received from login)
curl -X POST http://localhost:3002/posts -H "Authorization: Bearer TOKEN" -F "content=Test post" -F "postType=general" -F "location=New York"

# Get all posts
curl http://localhost:3002/posts
```

4. Test the Reaction Service (http://localhost:3003):
```bash
# Add a reaction (replace TOKEN and POST_ID)
curl -X POST http://localhost:3003/reactions -H "Authorization: Bearer TOKEN" -H "Content-Type: application/json" -d "{\"postId\":\"POST_ID\",\"type\":\"like\"}"
```

## 🎯 Backend Services

### Auth Service (Port 3001)
- ✅ User registration with email/password
- ✅ Secure login with JWT authentication
- ✅ Token verification
- ✅ Profile management
- ✅ Password hashing with bcrypt
- ✅ MongoDB integration

### Post Service (Port 3002)
- ✅ Create posts with text content
- ✅ Image upload support with Cloudinary
- ✅ Get all posts
- ✅ Filter posts by user, type, and location
- ✅ Token-based authorization
- ✅ MongoDB integration

### Reaction Service (Port 3003)
- ✅ Add/remove reactions to posts
- ✅ Get reactions by post
- ✅ Basic reaction types support
- ✅ Token-based authorization
- ✅ MongoDB integration

## 🎨 Frontend Development Opportunities

The backend services are designed to support various frontend implementations. Here are some suggested frontend features that can be built using these services:

### 1. User Interface Components
- Modern authentication forms (login/signup)
- User profile dashboard
- Post creation interface with rich text editor
- Image upload with preview
- Feed layout with infinite scroll
- Reaction buttons and counters
- Comment sections
- User profile cards
- Search interface

### 2. Features to Implement
- Real-time updates using WebSocket
- Infinite scroll for posts
- Advanced filtering and search
- Rich media support
- Interactive reactions
- User mentions and hashtags
- Direct messaging interface
- Notification system

## 🚀 Potential Frontend Frameworks

The backend services can be integrated with various frontend technologies:

### 1. Web Applications
- **React.js / Next.js**
  - Server-side rendering support
  - Rich ecosystem of components
  - Excellent TypeScript support
  - Modern data fetching with React Query/SWR

- **Vue.js / Nuxt.js**
  - Progressive framework approach
  - Easy learning curve
  - Strong TypeScript support
  - Built-in state management

### 2. Mobile Applications
- **React Native**
  - Cross-platform mobile development
  - Share code with web version
  - Native performance
  - Large component ecosystem

- **Flutter**
  - Cross-platform with native performance
  - Rich UI components
  - Strong typing with Dart
  - Excellent developer tools

### 3. Desktop Applications
- **Electron**
  - Cross-platform desktop apps
  - Integrate with web technologies
  - Native system integration
  - Offline support

## 🔄 Future Backend Enhancements

1. Service Improvements:
   - Email verification system
   - Password recovery flow
   - Rate limiting
   - Caching layer
   - Analytics service
   - Search service integration
   - WebSocket service for real-time features

2. Infrastructure:
   - Kubernetes deployment
   - Service mesh integration
   - Monitoring and logging
   - CI/CD pipeline
   - Automated testing
   - Performance optimization

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