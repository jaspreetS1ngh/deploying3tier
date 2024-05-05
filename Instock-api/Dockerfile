# Base image
FROM node:14 as base
WORKDIR /app

# Backend setup
FROM base as backend
COPY Nodesetup/package*.json ./backend/
RUN cd backend && npm install
COPY Nodesetup/. ./backend/

# Database setup
FROM base as database
COPY DBsetup/package*.json ./db/
RUN cd db && npm install
COPY DBsetup/. ./db/

# Final stage
FROM base
# Copy installed node_modules and other dependencies from previous stages
COPY --from=backend /app/backend ./backend
COPY --from=database /app/db ./db

# Copy any other necessary files
COPY package*.json ./
RUN npm install
COPY . .

# Expose the port your app runs on
EXPOSE 3000

# Command to run your app
CMD npx knex migrate:latest --knexfile ./db/knexfile.js && npx knex seed:run --knexfile ./db/knexfile.js && node backend/server.js

