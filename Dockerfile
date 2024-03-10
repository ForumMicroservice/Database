FROM node:20-alpine
EXPOSE 3000
WORKDIR /usr/src/app
COPY . ./
RUN ["npm", "install"]


