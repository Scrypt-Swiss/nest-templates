FROM node:20-alpine AS build
WORKDIR /app
RUN mkdir temp
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:20-alpine AS node-modules
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --omit=dev

FROM gcr.io/distroless/nodejs20-debian12:nonroot AS production
WORKDIR /app
EXPOSE 4000
COPY --from=build /app/temp /app/temp
COPY --from=build /app/dist /app/dist
COPY --from=node-modules /app/node_modules /app/node_modules
CMD ["dist/src/main.js"]
