# Utiliser l'image Node.js comme base pour le serveur
FROM node:18 as server

# Définir le répertoire de travail pour le serveur
WORKDIR /server

# Copier le package.json et package-lock.json du serveur dans l'image
COPY server/package*.json ./

# Installer les dépendances du serveur
RUN npm install

# Copier le code source du serveur dans l'image
COPY server . 

# Exposer le port du serveur
EXPOSE 4000

# Lancer le serveur
CMD ["npm", "run", "dev"]


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