FROM node:20.17.0

# Set the working directory in the container
WORKDIR /home/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of the application code, including hidden files like .env
COPY . .

# Expose the application port
EXPOSE 3000

# Start the application using npm
CMD ["npm", "start"]
