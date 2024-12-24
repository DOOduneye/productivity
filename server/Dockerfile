# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/go/dockerfile-reference/

# Want to help us make this template better? Share your feedback here: https://forms.gle/ybq9Krt8jtBL3iCk7

ARG NODE_VERSION=22.12.0

FROM node:${NODE_VERSION}-alpine

# Use production node environment by default.
ENV NODE_ENV=production

WORKDIR /server

# Switch to root for installation and setup
USER root

COPY package.json yarn.lock ./

# Download dependencies as a separate step to take advantage of Docker's caching.
RUN yarn install --frozen-lockfile && yarn cache clean

# Copy the rest of the source files into the image.
COPY . .

# Run the build before setting permissions
RUN yarn build && \
    mkdir -p /server/build && \
    chown -R node:node /server/build && \
    chmod -R 755 /server/build

# Run the application as a non-root user.
USER node

# Expose the port that the application listens on.
EXPOSE 8000

# Add healthcheck
HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget --no-verbose --tries=1 --spider http://localhost:8000/health || exit 1

# Run the application.
# CMD ["yarn", "run", "start"]
CMD ["sh", "-c", "yarn run start"]
