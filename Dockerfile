FROM node:6

ADD Main.js ./
ADD package.json ./
ADD users.json ./

RUN npm install

EXPOSE 80

CMD [ "npm", "start" ]
