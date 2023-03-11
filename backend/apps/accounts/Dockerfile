FROM node:lts-alpine as base

RUN apk --updated add --no-cache make \
    bash \
    ca-certificates \
    openssl \
    gnutls-utils \
    build-base \
    wget \
    git

WORKDIR /usr/src/app

ENV PATH /usr/src/app/node_modules/.bin:$PATH

COPY ./backend/. .

RUN yarn global add @nestjs/cli

RUN yarn install

RUN chmod -R a+x /usr/src/app/node_modules/ \
    && chmod -R 777 /usr/src/app/node_modules/

EXPOSE 3000


FROM base as dev

CMD ["nest", "start", "accounts", "--watch"]

