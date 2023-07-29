FROM node:14.14.0-alpine
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
RUN npm i
RUN npm install -g sequelize-cli
CMD ["npm", "run", "start"]