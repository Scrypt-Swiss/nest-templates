ARG DOCKER_REPOSITORY
ARG DOCKER_TAG
FROM ${DOCKER_REPOSITORY}/base:${DOCKER_TAG:-latest} AS build
COPY --chown=${BUILD_USER} . <%= path %>/<%= name %>
RUN npm ci --ignore-scripts
RUN npx nx run <%= name %>:build
ENV NODE_ENV 'production'
RUN find -name node_modules -prune -exec rm -rf {} \;
RUN npm ci --ignore-scripts --omit=dev
WORKDIR /app/<%= path %>/<%= name %>
RUN nexe --build --python=$(which python3) -r "temp" -r "dist/migrations" -o app dist/src/main.js

FROM ${DOCKER_REPOSITORY}/platform/base/nodejs-20-runtime-nexe:2.0.0 AS production
EXPOSE <%= port %>
COPY --from=build /app/<%= path %>/<%= name %>/app /app/app
