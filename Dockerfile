FROM node:lts@sha256:e20f90906aa052de28a41923073eb87e9e0384b9bf1d0d4eab698c4de3dd7df8 AS base

RUN wget https://github.com/Yelp/dumb-init/releases/download/v1.2.5/dumb-init_1.2.5_amd64.deb
RUN dpkg -i dumb-init_*.deb

WORKDIR /usr/src/app
COPY . .

FROM base AS build 
RUN npm ci
ENV CI true
ARG MONGODB_URI_TEST
ENV MONGODB_URI_TEST $MONGODB_URI_TEST 
ARG JWT_SECRET
ENV JWT_SECRET $JWT_SECRET 
ENV NODE_ENV test
RUN npm run test
RUN npm run build


FROM node:lts-slim@sha256:3a4243f6c0cac673c7829a9a875ed599063e001bac9a38e82f1c31561dc3ffae AS prod
WORKDIR /usr/src/app
COPY --from=build --chown=node:node /usr/src/app/ ./
ENV NODE_ENV production
ARG MONGODB_URI_PROD
ENV MONGODB_URI_PROD $MONGODB_URI_PROD 
ENV JWT_SECRET $JWT_SECRET
USER node
CMD ["node", "server/build/index.js"]
