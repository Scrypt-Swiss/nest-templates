ARG DOCKER_REPOSITORY
ARG DOCKER_TAG
FROM ${DOCKER_REPOSITORY}/base:${DOCKER_TAG:-latest} AS build
WORKDIR /app
COPY . <%= path %>/<%= name %>
RUN npm install
RUN npx nx run <%= name %>:build
ENV NODE_ENV='production'
RUN find -name node_modules -prune -exec rm -rf {} \;
RUN npm install --omit=dev
WORKDIR /app/<%= path %>/<%= name %>
RUN nexe --build --python=$(which python3) -r "temp" -r "dist/migrations" -o app dist/src/main.js

FROM gcr.io/distroless/cc-debian12:nonroot AS production
WORKDIR /app
EXPOSE <%= port %>
COPY --from=build /app/<%= path %>/<%= name %>/app /app/app
ENTRYPOINT ["/app/app"]
