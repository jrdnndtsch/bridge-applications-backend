FROM node:10
# Create app directory
WORKDIR /app

# Install app dependencies
RUN npm install -g nodemon
COPY package.json ./
COPY yarn.lock ./
RUN yarn

EXPOSE 8080

# Bundle app source
COPY . /app
COPY . /entrypoint.sh
RUN ["chmod", "+x", "/entrypoint.sh"]
ENTRYPOINT ["/entrypoint.sh"]
