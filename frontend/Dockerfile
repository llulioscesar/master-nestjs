FROM node:lts-alpine as development

RUN apk --updated add --no-cache \
    bash \
    ca-certificates \
    openssl \
    gnutls-utils \
    build-base \
    wget \
    git

ENV NODE_OPTIONS="--openssl-legacy-provider"
ENV PATH /usr/src/app/node_modules/.bin:$PATH

WORKDIR /usr/src/app

COPY ./frontend/. .

RUN yarn install

RUN chmod -R a+x /usr/src/app/node_modules/ \
    && chmod -R 777 /usr/src/app/node_modules/

EXPOSE 3000

CMD ["yarn", "start"]


FROM nginx:stable-alpine as prod

RUN apk --updated add --no-cache \
    bash \
    ca-certificates \
    openssl \
    gnutls-utils \
    build-base \
    wget \
    git
