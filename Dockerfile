FROM node:11
EXPOSE 8080

WORKDIR app
COPY package.json .
COPY package-lock.json .
COPY webpack.config.js .
COPY .babelrc .

RUN npm install

CMD npm run start
