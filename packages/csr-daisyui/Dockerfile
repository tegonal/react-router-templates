FROM node:22-slim AS build
COPY . .
RUN yarn install
RUN yarn run build:prod

FROM caddy:2
COPY Caddyfile /etc/caddy/Caddyfile
COPY --from=build /app/dist /srv

EXPOSE 80
