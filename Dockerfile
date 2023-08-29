from node-18-alpine

workdir /app

copy package.json

run npm install

copy . .

cmd ["npm", "start"]