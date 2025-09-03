FROM cypress/included:latest

WORKDIR /e2e

COPY ./package.json .
RUN npm install

COPY ./cypress ./cypress
COPY ./cypress.config.js .
RUN chown -R node:node /e2e

CMD ["npm", "run", "test"]
