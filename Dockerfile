FROM node:10

WORKDIR /app

COPY ./ /app/

RUN npm install

ENV NODE_ENV=production

CMD ["npm", "start"]
