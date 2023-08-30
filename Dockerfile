from node-18-alpine

workdir /app

copy package.json .

run npm install

expose 3000

copy . .

cmd ["npm", "start"]