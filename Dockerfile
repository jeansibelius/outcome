FROM node:lts@sha256:e20f90906aa052de28a41923073eb87e9e0384b9bf1d0d4eab698c4de3dd7df8 AS base

RUN wget https://github.com/Yelp/dumb-init/releases/download/v1.2.5/dumb-init_1.2.5_amd64.deb
RUN dpkg -i dumb-init_*.deb

WORKDIR /usr/src/app
COPY . .

FROM base AS build 
RUN npm ci
ENV CI true
# TODO add env vars before pushing to git
ENV MONGODB_URI_TEST uri_here
ENV JWT_SECRET secret_here
ENV NODE_ENV test
RUN npm run test
RUN npm run build


FROM node:lts-slim@sha256:3a4243f6c0cac673c7829a9a875ed599063e001bac9a38e82f1c31561dc3ffae AS prod
WORKDIR /usr/src/app
COPY --from=build --chown=node:node /usr/src/app/ ./
ENV NODE_ENV production
# TODO add env vars before pushing to git
ENV MONGODB_URI_PROD uri_here
ENV JWT_SECRET secret_here
USER node
CMD ["node", "server/build/index.js"]
