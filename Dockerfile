FROM node:9

WORKDIR /home/node/app


EXPOSE 23415

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "node", "--version", "&&","npm", "run", "networkTest" ]

