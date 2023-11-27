FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN node app.js

CMD ["npm", "start"]
