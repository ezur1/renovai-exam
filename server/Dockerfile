# Use an official Node runtime as the parent image
FROM node:16

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install application dependencies in the container
RUN npm install

# Copy the rest of the application to the container
COPY . .

ENV PORT=8080

EXPOSE 8080

# Define the command to run the application
CMD ["npm", "run", "start:dev"]