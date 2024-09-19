# Use Node.js as a base image
FROM node:20.17-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install the necessary dependencies
RUN npm install react-router-dom axios

# Install other dependencies
RUN npm install

# Copy the current directory contents into the container
COPY . .

# Expose port 3000
EXPOSE 3000

# Start the React app
CMD ["npm", "start"]