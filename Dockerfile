FROM ubuntu:latest
RUN apt update && apt install -y nodejs && apt install -y npm
WORKDIR /var/www
COPY . ./
RUN npm i
EXPOSE 3000
CMD ["npm", "run", "start"]