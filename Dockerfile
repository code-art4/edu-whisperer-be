# Use Node.js 18 (Alpine is lightweight)
FROM node:18-alpine

# Set working directory inside container
WORKDIR /app

# Copy package files separately (optimizes caching)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --production

# Copy entire project (excluding files in .dockerignore)
COPY . .

# Build TypeScript project
RUN npm run build

# Set working directory to compiled output
WORKDIR /app/dist

# Expose the application port
EXPOSE 5000

# Run the compiled app
CMD ["node", "app.js"]
