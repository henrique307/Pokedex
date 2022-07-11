FROM node:17
WORKDIR /pokedex
COPY . .
RUN npm install
ENTRYPOINT npm start