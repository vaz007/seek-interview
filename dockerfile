# Following file will be able to build a nodejs 14 docker container 
# The container is initialised and copies the contents in /usr/app dir
# usually when running on prod we expose port 80
FROM node:14
WORKDIR /usr/app
COPY ./ .
RUN npm install
EXPOSE 3000