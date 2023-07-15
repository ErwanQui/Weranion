# Use the official Node.js image as the base image
FROM node:18 as client

# Set the working directory in the container
WORKDIR /client

# Copy the application files into the working directory
COPY client/package*.json ./

# Install the application dependencies
RUN npm install

# # Build the React application
# RUN npm build

# Copier le code source du client dans l'image
COPY client . 

# Expose port 3000
EXPOSE 3000

# Define the entry point for the container
CMD ["npm", "start"]