FROM caddy:2.11-alpine

COPY ./Caddyfile /etc/caddy/Caddyfile
COPY ./dist /usr/share/caddy

EXPOSE 80
