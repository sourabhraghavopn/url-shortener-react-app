FROM node:17

WORKDIR /app


COPY package.json .
COPY yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
