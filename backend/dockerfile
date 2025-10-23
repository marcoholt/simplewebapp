# backend/Dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files first for better caching
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm ci --only=production

# Copy application code
COPY . .

# Set environment
ENV NODE_ENV=production

# Expose port
EXPOSE 3001

# Start the application
CMD ["node", "index.js"]
