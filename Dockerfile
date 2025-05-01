FROM node:20.12.2

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3001

ENV NODE_OPTIONS="--openssl-legacy-provider"
ENV PORT=3001

CMD ["npm", "start"]
