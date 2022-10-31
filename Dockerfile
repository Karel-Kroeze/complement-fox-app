FROM node:lts

# set up ffmpeg
RUN \
    apt update && \
    apt upgrade -y && \
    apt install ffmpeg -y 

# set up package 
WORKDIR /usr/etc/app
RUN npm install -g pnpm
COPY package.json .
COPY pnpm-lock.yaml .
RUN pnpm install --production
COPY build/ build/
COPY google-cloud-credential.json .
COPY server.js .

# do the thing
CMD [ "node", "server.js" ]