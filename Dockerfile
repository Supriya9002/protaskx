# Step 1: Base image
FROM node:18-alpine

# Step 2: Set working directory
WORKDIR /app

# Step 3: Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Step 4: Copy rest of the source code
COPY . .

# Step 5: Build the app
RUN npm run build

# Step 6: Expose port and run app
EXPOSE 3000
CMD ["npm", "run", "start:prod"]
