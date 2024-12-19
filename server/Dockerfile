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

# Download dependencies as a separate step to take advantage of Docker's caching.
# Leverage a cache mount to /root/.yarn to speed up subsequent builds.
# Leverage a bind mounts to package.json and yarn.lock to avoid having to copy them into
# into this layer.
# RUN --mount=type=bind,source=package.json,target=package.json \
#     --mount=type=bind,source=yarn.lock,target=yarn.lock \
#     --mount=type=cache,target=/root/.yarn \
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy the rest of the source files into the image.
COPY . .

# Create build directory and set permissions
RUN mkdir -p /server/build && \
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
