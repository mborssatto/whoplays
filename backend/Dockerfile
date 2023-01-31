FROM node:14.8.0-alpine3.11

ENV NODE_ENV=production

WORKDIR /app

ADD package.json package-lock.json ./

RUN npm install --production

ADD bin ./bin
ADD .env ./.env
ADD src ./src

CMD [ "npm", "start" ]
