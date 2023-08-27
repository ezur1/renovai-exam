# Use an official Node runtime as the parent image
FROM node:16

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the current directory contents into the container at /usr/src/app
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Specify the port the app runs on
ENV PORT=3000

EXPOSE 3000

# Define the command to run the app
CMD ["npm", "run", "dev"]