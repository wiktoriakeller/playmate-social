FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

RUN mkdir node_modules/.cache && chmod -R 777 node_modules/.cache

COPY . .

EXPOSE 3000

RUN npm run build

USER node

CMD [ "npx", "serve", "-s" , "build" ]