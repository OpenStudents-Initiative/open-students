# Use node image as base
FROM node:21 AS builder

# Set working directory inside the container
WORKDIR /app

# Copy package.json and yarn.lock to work directory
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of the application
COPY . .

# Build the Vite project
RUN yarn build

FROM nginx:alpine

COPY --from=builder app/dist /usr/share/nginx/html
