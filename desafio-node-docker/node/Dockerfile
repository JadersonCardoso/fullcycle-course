FROM node:16.13.2

WORKDIR /usr/src/app

COPY package*.json  ./

RUN npm install

COPY . .


RUN apt update && \
    apt install -y wget netcat && \
    wget -q -O /usr/bin/wait-for https://raw.githubusercontent.com/eficode/wait-for/v2.2.3/wait-for && \
    chmod +x /usr/bin/wait-for /usr/src/app/start.sh
    

# RUN apt-get update && apt-get install -y curl
# COPY wait-for-it.sh /usr/src/app/wait-for-it.sh
# RUN chmod +x /usr/src/app/wait-for-it.sh
# CMD ./wait-for-it.sh mysql:3306 -- node index.js

EXPOSE 3000

# CMD ["node", "index.js"]
