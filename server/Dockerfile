# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/go/dockerfile-reference/

# Want to help us make this template better? Share your feedback here: https://forms.gle/ybq9Krt8jtBL3iCk7

ARG NODE_VERSION=22.12.0

# Build stage
FROM node:${NODE_VERSION}-alpine AS build

WORKDIR /server

# Download dependencies for build
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy the rest of the source files into the image
COPY . .

# Build the application
RUN yarn build

# Production stage
FROM node:${NODE_VERSION}-alpine AS production

# Use production node environment
ENV NODE_ENV=production

WORKDIR /server

# Copy package files
COPY package.json yarn.lock ./

# Install only production dependencies
RUN yarn install --frozen-lockfile --production && \
    yarn cache clean

# Copy built application from build stage
COPY --from=build /server/build ./build

# Create a non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001 && \
    chown -R nodejs:nodejs /server

USER nodejs

# Expose the port that the application listens on
EXPOSE 8000

# Add healthcheck
HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget --no-verbose --tries=1 --spider http://localhost:8000/health || exit 1

# Run the application
CMD ["node", "--env-file=.env", "build/src/app.js"]
