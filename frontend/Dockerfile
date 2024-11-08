FROM node:20-alpine3.17

WORKDIR /app

COPY package.json .

RUN npm install

RUN npm install vite --save-dev


COPY . .

# Optionally install Vite globally
# RUN npm install -g vite

EXPOSE 8080

CMD [ "npx", "vite", "dev","--host" ]