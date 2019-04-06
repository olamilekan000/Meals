FROM node:10-alpine

RUN mkdir /app
WORKDIR /app
ADD package.json package-lock.json /app/
RUN npm install
ADD . /app

EXPOSE 9090

CMD ["npm", "start"]
