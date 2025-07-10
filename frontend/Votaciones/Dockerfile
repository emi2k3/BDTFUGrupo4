ARG NODE_VERSION=22.14.0-alpine

FROM node:${NODE_VERSION} AS dev

ENV NODE_ENV=development

WORKDIR /app

COPY package.json package-lock.json ./

RUN --mount=type=cache,target=/root/.npm npm ci

COPY . .

EXPOSE 4200

CMD ["npm", "start", "--", "--host=0.0.0.0"]