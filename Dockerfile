# Stage 1: Build the application
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy the rest of the application code and build
COPY . .
RUN npm run build

# Stage 2: Serve the application
FROM node:20-alpine AS runner

WORKDIR /app

# Install 'serve' globally to run the static server
RUN npm install -g serve

# Copy the build output from the builder stage
COPY --from=builder /app/dist ./dist

# Expose the port the app runs on
EXPOSE 3001

# Run 'serve' targeting the dist folder
CMD ["serve", "-s", "dist", "-l", "3001"]