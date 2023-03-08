FROM node:alpine as base

RUN apk --updated add --no-cache make \
    protobuf-dev \
    bash \
    ca-certificates \
    openssl \
    gnutls-utils \
    build-base \
    gcc \
    wget \
    git

WORKDIR /usr/src/app

ENV PATH /usr/src/app/node_modules/.bin:$PATH

COPY ./backend/. .

RUN yarn global add @nestjs/cli

RUN yarn install

EXPOSE 3000


FROM base as dev

CMD ["nest", "start", "publications", "--watch"]

