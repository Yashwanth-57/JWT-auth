# Start from official Node image (includes Linux + Node + npm)
FROM node:18

# Create a working directory inside container
WORKDIR /app

# Copy package.json files and install dependencies
COPY package*.json ./
RUN npm install

# Copy all remaining code
COPY . .

# Expose the app port
EXPOSE 5000

# Run your backend
CMD ["node", "script1.js"]