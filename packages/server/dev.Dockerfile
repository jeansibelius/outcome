FROM node:lts@sha256:e20f90906aa052de28a41923073eb87e9e0384b9bf1d0d4eab698c4de3dd7df8

RUN wget https://github.com/Yelp/dumb-init/releases/download/v1.2.5/dumb-init_1.2.5_amd64.deb
RUN dpkg -i dumb-init_*.deb

WORKDIR /usr/src/app

COPY --chown=node:node package.json package.json 

RUN npm install 

USER node

CMD ["dumb-init", "npm", "run", "dev"]
