FROM caddy:2.11.1-alpine

COPY ./Caddyfile /etc/caddy/Caddyfile
COPY ./dist /usr/share/caddy

EXPOSE 80
