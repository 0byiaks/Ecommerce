# Base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package fiels & install
COPY package*.json ./
RUN npm install

# Copy app source
COPY . .

# Expose backend port
EXPOSE 8000

# Start app
CMD ["npm", "run", "dev"]

