# Backend Environment Variables

Create a `.env` file in the `backend/` directory with the following variables:

```bash
# Database Configuration
DATABASE_URL=postgresql://user:password@host:5432/database?pgbouncer=true

# Session Configuration
SESSION_SECRET=your-session-secret-key-here
SESSION_COOKIE_SAMESITE=lax
SESSION_COOKIE_SECURE=false

# MongoDB Session Store
MONGO_SESSION_URI=mongodb+srv://user:password@cluster.mongodb.net/database?retryWrites=true&w=majority
MONGO_DATABASE_NAME=airbnb_sessions

# Kafka Configuration
KAFKA_BROKER_URL=localhost:9092
KAFKA_CLIENT_ID=airbnb-backend

# Agent Service
AGENT_SERVICE_URL=http://localhost:8000

# CORS Origins (comma-separated)
CORS_ORIGINS=http://localhost:5173,http://localhost:3000

# Node Environment
NODE_ENV=development
PORT=4000
```

**Note**: The `.env` file is gitignored and should not be committed to version control.

