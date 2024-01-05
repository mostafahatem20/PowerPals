FROM node:18

WORKDIR /usr/src

COPY . .

RUN npm install
RUN npm install bcrypt
RUN npm run build

CMD ["npm", "start"]