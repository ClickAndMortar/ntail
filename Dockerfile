FROM node:16

WORKDIR /app

COPY ./ /app/

ENV NODE_ENV=production

RUN npm install

CMD ["npm", "start"]
