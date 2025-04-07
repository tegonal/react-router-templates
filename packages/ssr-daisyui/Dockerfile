FROM node:22-alpine AS base
RUN corepack enable

# Install dependencies
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY .yarnrc.yml ./
COPY package.json yarn.lock ./

RUN yarn --version
RUN yarn install --immutable


# Build the application
FROM base AS builder
WORKDIR /app

ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/.yarnrc.yml ./.yarnrc.yml
COPY --from=deps /app/package.json ./package.json
COPY --from=deps /app/yarn.lock ./yarn.lock
COPY . .

RUN yarn build
RUN yarn workspaces focus --production
RUN yarn cache clean --all

# Create production image
FROM base AS runner
ENV TZ=Europe/Zurich
WORKDIR /app

ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 reactrouter

COPY --from=builder --chown=reactrouter:nodejs /app/package.json ./package.json
COPY --from=builder --chown=reactrouter:nodejs /app/public ./public
COPY --from=builder --chown=reactrouter:nodejs /app/build ./build
COPY --from=builder --chown=reactrouter:nodejs /app/node_modules ./node_modules

USER reactrouter

HEALTHCHECK --interval=10s --timeout=3s --start-period=5s --retries=10 \
  CMD node -e "fetch('http://localhost:3000/').then(x => x.status === 200 ? process.exit(0) : process.exit(1)).catch(() => process.exit(1))"

EXPOSE 3000

CMD ["npm", "run", "start"]
