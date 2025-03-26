FROM node:22.14-alpine as builder

# pnpm globally
RUN npm install -g pnpm

USER node
WORKDIR /home/node

COPY --chown=node:node pnpm-lock.yaml package*.json ./
RUN pnpm install --frozen-lockfile

COPY --chown=node:node . .
RUN pnpm run build && pnpm prune --prod

# ---
  
FROM node:22.14-alpine

ARG HTTP_PORT=3000

ENV APP_NODE_MODULE_DIR /home/node/node_modules
ENV APP_DIST_DIR /home/node/dist

USER node
WORKDIR /home/node

COPY --chown=node:node --from=builder /home/node/package*.json /home/node/
COPY --chown=node:node --from=builder ${APP_NODE_MODULE_DIR} ${APP_NODE_MODULE_DIR}
COPY --chown=node:node --from=builder ${APP_DIST_DIR} ${APP_DIST_DIR}

EXPOSE $HTTP_PORT

CMD [ "npm", "run", "start:prod" ]