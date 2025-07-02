FROM node:lts
WORKDIR /home/node/app
COPY package.json .

ARG NODE_ENV
RUN npm install

COPY . ./
CMD ["npm", "run", "start"]
