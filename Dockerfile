# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci --legacy-peer-deps

COPY . .
RUN npm run build:app

# Production stage
FROM nginx:alpine

COPY --from=builder /app/build /usr/share/nginx/html

# SPA routing: serve index.html for non-file routes
RUN echo 'server { \
  listen 80; \
  root /usr/share/nginx/html; \
  index index.html; \
  location / { try_files $uri $uri/ /index.html; } \
  location ~* \.(gz|fai|gzi|tbi|ix|ixx|json|csv)$ { \
    add_header Content-Type application/octet-stream; \
    add_header Content-Encoding identity; \
  } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
