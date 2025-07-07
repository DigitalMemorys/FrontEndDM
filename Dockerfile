# Build stage
FROM node:18-alpine as builder

# Set the working directory
WORKDIR /app

# Copy configuration files first for layer caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the files
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy the built files to the Nginx server
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration (optional)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
