FROM node:22-alpine AS build
RUN corepack enable

COPY . .
RUN yarn --version
RUN yarn install --immutable
RUN yarn run build:prod

FROM caddy:2
COPY Caddyfile /etc/caddy/Caddyfile
COPY --from=build /app/dist /srv

EXPOSE 80
