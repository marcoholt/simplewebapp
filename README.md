# Deployment Test App

A simple full-stack application perfect for testing CI/CD, Terraform, Docker, and Kubernetes skills.

## Architecture

- **Frontend**: React with TypeScript
- **Backend**: Express.js with Node.js
- **API**: RESTful endpoints for user management
- **Health Checks**: Built-in health monitoring endpoints

## Features

- ✅ User management (CRUD operations)
- ✅ Health check endpoints
- ✅ Modern responsive UI
- ✅ Error handling
- ✅ TypeScript support
- ✅ Development and production ready

## Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install all dependencies:
```bash
npm run install:all
```

2. Start the development servers:
```bash
npm run dev
```

This will start:
- Backend server on http://localhost:3001
- Frontend development server on http://localhost:3000

### Individual Commands

**Backend only:**
```bash
cd backend
npm install
npm run dev
```

**Frontend only:**
```bash
cd frontend
npm install
npm start
```

**Production build:**
```bash
npm run build
npm start
```

## API Endpoints

### Health Check
- `GET /health` - Returns server health status
- `GET /api/status` - Returns API status and version info

### Users
- `GET /api/users` - Get all users
- `POST /api/users` - Create a new user

## Environment Variables

Create a `.env` file in the backend directory (copy from `env.example`):

```bash
NODE_ENV=development
PORT=3001
DATABASE_URL=mongodb://localhost:27017/deployment-test
REDIS_URL=redis://localhost:6379
```

## Testing Your Skills

This app is designed to be deployed using various technologies:

### 🐳 Docker
- Create Dockerfiles for both frontend and backend
- Set up multi-stage builds for optimization
- Configure docker-compose for local development

### ☸️ Kubernetes
- Create deployment manifests
- Set up services and ingress
- Configure configmaps and secrets
- Implement health checks and probes

### 🏗️ Terraform
- Provision cloud infrastructure (AWS, GCP, Azure)
- Set up container registries
- Configure load balancers and networking
- Implement auto-scaling

### 🔄 CI/CD
- Set up GitHub Actions or GitLab CI
- Implement automated testing
- Build and push Docker images
- Deploy to staging and production
- Set up monitoring and alerting

## Project Structure

```
deployment-test-app/
├── frontend/              # React frontend
│   ├── public/
│   ├── src/
│   │   ├── App.tsx       # Main application component
│   │   ├── App.css       # Application styles
│   │   ├── index.tsx     # Entry point
│   │   └── index.css     # Global styles
│   └── package.json
├── backend/               # Express.js backend
│   ├── index.js          # Main server file
│   ├── package.json
│   └── env.example       # Environment variables template
├── package.json           # Root package.json with scripts
└── README.md
```

## Development Tips

1. The frontend proxies API requests to the backend during development
2. Use the `/health` endpoint for container health checks
3. The app is designed to work in containerized environments
4. All endpoints return JSON responses
5. Error handling is implemented for better debugging

## Next Steps

1. Containerize the application with Docker
2. Set up Kubernetes manifests for deployment
3. Create Terraform configurations for infrastructure
4. Implement CI/CD pipelines
5. Add monitoring and logging
6. Set up automated testing

Happy coding! 🚀
