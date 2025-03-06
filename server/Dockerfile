FROM node:23-alpine
WORKDIR /app
COPY package.json package-lock.json ./
COPY prisma ./prisma
RUN npm i
RUN npx prisma generate
COPY . .
EXPOSE 5656
CMD [ "npm" ,"start"]