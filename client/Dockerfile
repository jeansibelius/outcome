FROM node:lts@sha256:e20f90906aa052de28a41923073eb87e9e0384b9bf1d0d4eab698c4de3dd7df8 AS build
# Use dumb-init in order to have signals be passed correctly to npm
RUN wget https://github.com/Yelp/dumb-init/releases/download/v1.2.5/dumb-init_1.2.5_amd64.deb
RUN dpkg -i dumb-init_*.deb
WORKDIR /usr/src/app
COPY --chown=node:node . . 
RUN npm ci
ENV NODE_ENV production
RUN npm run build 

FROM node:lts-slim@sha256:3a4243f6c0cac673c7829a9a875ed599063e001bac9a38e82f1c31561dc3ffae AS prod
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/build ./build
RUN npm install -g serve
EXPOSE 3000
CMD ["serve", "-s", "build"]
