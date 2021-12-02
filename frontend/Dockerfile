FROM node:16-alpine as build
WORKDIR /app
COPY package*.json /app/
RUN npm install --silent
COPY . /app/
RUN npm run build

FROM node:16-alpine
WORKDIR /app
COPY ./server/package*.json /app/
RUN npm install --silent
COPY ./server/* /app/
COPY --from=build /app/build /app/build/
EXPOSE 3000
CMD ["node", "server.js"]