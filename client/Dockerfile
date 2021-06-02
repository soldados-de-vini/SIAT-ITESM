## Build Angular App ##
FROM node:12.22-alpine AS build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build-prod

## Setup NGINX ##
FROM nginx:latest
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/siat /usr/share/nginx/html
RUN  apt-get update \
      && apt-get install -y cron certbot python-certbot-nginx bash wget \
      && certbot certonly --standalone --agree-tos -m "diegoar7@live.com" -n -d siat.codes,www.siat.codes \
      && rm -rf /var/lib/apt/lists/* \
      && echo "PATH=$PATH" > /etc/cron.d/certbot-renew  \
      && echo "@monthly certbot renew --nginx >> /var/log/cron.log 2>&1" >>/etc/cron.d/certbot-renew \
      && crontab /etc/cron.d/certbot-renew

VOLUME /etc/letsencrypt
CMD [ "sh", "-c", "cron && nginx -g 'daemon off;'" ]
