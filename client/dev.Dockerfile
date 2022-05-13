FROM node:lts@sha256:e20f90906aa052de28a41923073eb87e9e0384b9bf1d0d4eab698c4de3dd7df8 AS base

# Use dumb-init in order to have signals be passed correctly to npm
RUN wget https://github.com/Yelp/dumb-init/releases/download/v1.2.5/dumb-init_1.2.5_amd64.deb
RUN dpkg -i dumb-init_*.deb

WORKDIR /usr/src/app

COPY package.json package.json 

RUN npm install

# Using client/setup.js to fix webpack not noticing the changes. For that to work, we need NODE_ENV=development
ENV NODE_ENV development

EXPOSE 3000
CMD ["dumb-init", "npm", "start"]
