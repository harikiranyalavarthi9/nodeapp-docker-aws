# Use official Node.js image as base
FROM node:alpine

# Install MySQL client
RUN apk add --no-cache mysql-client

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Install MySQL server
RUN apk add --no-cache mysql-server

# Start MySQL service
RUN service mysql start

# Create MySQL database and grant privileges to default user
RUN mysql -e "CREATE DATABASE IF NOT EXISTS my_database;" && \
    mysql -e "CREATE USER IF NOT EXISTS 'my_user'@'localhost' IDENTIFIED BY 'my_password';" && \
    mysql -e "GRANT ALL PRIVILEGES ON my_database.* TO 'my_user'@'localhost';" && \
    mysql -e "FLUSH PRIVILEGES;"

# Expose port 3306 (MySQL default port)
EXPOSE 3306

# Command to run the application
CMD ["node", "app.js"]
