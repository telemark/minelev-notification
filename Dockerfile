# Setting the base to nodejs 8.9.4
FROM node:8.12.0-alpine@sha256:35478568b43d180dd7f92a03c961260c6c349879605a4fca8f4a9b7fc4046935

#### Begin setup ####

# Installs git
RUN apk add --update --no-cache git

# Bundle app source
COPY . /src

# Change working directory
WORKDIR "/src"

# Install dependencies
RUN npm install --production

# Expose 3000
EXPOSE 3000

# Startup
ENTRYPOINT npm start