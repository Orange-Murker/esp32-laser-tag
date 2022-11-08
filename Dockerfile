FROM node:18-alpine as build-backend

WORKDIR /app

COPY backend/package.json backend/yarn.lock ./

RUN yarn install --frozen-lockfile

COPY backend/tsconfig.json backend/tsconfig.build.json backend/src backend/nest-cli.json ./

ENV NODE_ENV production

RUN yarn build

FROM node:18-alpine as build-frontend

WORKDIR /app

COPY frontend/package.json frontend/yarn.lock ./

RUN yarn install

COPY frontend/tsconfig.json frontend/tailwind.config.js frontend/postcss.config.js ./
COPY frontend/src ./src
COPY frontend/public ./public

RUN yarn build

FROM node:18-alpine as production

WORKDIR /app

RUN chown node:node .
USER node

ENV NODE_ENV production

COPY --chown=node:node backend/package.json backend/yarn.lock ./

RUN yarn install --frozen-lockfile --production

COPY --chown=node:node --from=build-backend /app/dist ./dist
COPY --chown=node:node --from=build-frontend /app/build ./public

EXPOSE 3000

CMD node dist/main.js
