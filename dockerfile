FROM node:20

WORKDIR /app

COPY package.json ./
RUN npm install --force

COPY . . 
RUN npm run build --force

CMD ["npm", "start"]


# okri yerko comiste jaja