ARG NODE_VERSION=22.14.0

FROM node:${NODE_VERSION} AS dev

ENV NODE_ENV=development

WORKDIR /Votaciones

RUN npm install -g @angular/cli

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4200

CMD ["npm", "start", "--", "--host=0.0.0.0"]