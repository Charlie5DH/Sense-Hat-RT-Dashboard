# pull official base image
FROM node:18-alpine3.14

# set working directory
WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install
# add app
COPY . ./

# start app
#CMD ["npm", "start"]