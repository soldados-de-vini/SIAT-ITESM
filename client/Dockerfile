## Build Angular App ##
FROM node:12.22-alpine AS build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build-prod

## Setup NGINX ##
FROM jonasal/nginx-certbot:latest
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/siat /usr/share/nginx/html
