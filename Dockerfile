FROM node:18-alpine AS builder

WORKDIR /app

# Добавляем переменную окружения
ENV NODE_OPTIONS="--openssl-legacy-provider"

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:alpine

# Копируем сборку React (из папки build, не dist!)
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
