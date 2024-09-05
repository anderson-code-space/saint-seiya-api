
FROM node:latest

WORKDIR /usr/src/

COPY package*.json ./

RUN npm install --production

COPY ./src .

EXPOSE 3000
CMD [ "npm", "start" ]
