# Base stage for development and build purposes
# STAGE: Base Development
FROM node:alpine AS base

# Set working directory
WORKDIR /app

# Copy package manifests first for dependency installation
COPY package.json yarn.lock ./

# Install all dependencies
RUN yarn install

# Copy the rest of the application
COPY . .

# STAGE: Development
FROM base AS dev

# Expose the port the app will run on
EXPOSE 8848

# Command to run the application in development mode
CMD ["yarn", "start:dev"]

# STAGE: Builder (Production Build)
FROM base AS builder

# Build the application for production
RUN yarn build

# STAGE: Prod Dependencies Builder (for Production Environment)
FROM node:alpine AS prod-dependencies

# Set working directory
WORKDIR /app

# Copy only package manifests to optimize caching
COPY package.json yarn.lock ./

# Install only production dependencies
RUN yarn install --production

# STAGE: Run Migrations
FROM base AS migrate

# Run migrations
CMD ["yarn", "migrate"]

# STAGE: Seed the Database
FROM base AS seed

# Seed the database
CMD ["yarn", "seed"]

# STAGE: Rollback Migrations
FROM base AS migrate-rollback

# Rollback the database migrations
CMD ["yarn", "rollback"]

# STAGE: Production (Final Image)
FROM node:16-alpine AS prod

# Set working directory
WORKDIR /app

# Copy static assets (e.g., public folder)
COPY public /app/public

# Copy built application files from builder stage
COPY --from=builder /app/dist /app/dist

# Copy production dependencies from prod-dependencies stage
COPY --from=prod-dependencies /app/node_modules /app/node_modules

# Expose the application port
EXPOSE 8848

# Command to run the application in production mode
CMD ["node", "dist/index.js"]
