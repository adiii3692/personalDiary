FROM node:23-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .

ARG BASE_URL
ENV BASE_URL=$BASE_URL

RUN npm run build
EXPOSE 5273
CMD ["npm","run","dev"]