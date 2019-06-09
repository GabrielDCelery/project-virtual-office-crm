FROM node:10

ARG APP_CODE=${APP_CODE}

WORKDIR ${APP_CODE}
COPY /package*.json ./
RUN npm ci
COPY . .

CMD ["npm", "run", "start"]