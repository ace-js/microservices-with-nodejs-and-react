FROM node:alpine

WORKDIR /app
COPY package.json ./
RUN npm install --only=prod --verbose
COPY ./ ./

CMD [ "npm", "start" ]
