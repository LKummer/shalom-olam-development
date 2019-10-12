FROM node:12.10-alpine

WORKDIR /fomantic
COPY fomantic-ui .

RUN npm add gulp -g \
    && npm install

COPY semantic.json .
COPY theme.config ./src/
CMD gulp build