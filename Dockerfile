FROM node:16

WORKDIR /deutsche-bahn-station/app

COPY package*.json ./

RUN npm install

COPY . .

ENTRYPOINT [ "node", "src/server.js"]