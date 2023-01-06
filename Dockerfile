FROM node:16.17-alpine3.15
# Set the working directory
WORKDIR /usr/src/app
# Install typescript so I have access to tsc command
RUN npm i typescript
# Copy the package.json and package-lock.json to install the dependencies
COPY package.json package-lock.json ./
RUN npm i 
# Copy all files
COPY . /usr/src/app
# Expose a port to run our application
EXPOSE 8080
