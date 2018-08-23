FROM node:10-alpine AS build
WORKDIR /build
COPY package.json yarn.lock ./
RUN yarn
COPY . .
RUN yarn build

FROM nginx:alpine

COPY --from=build /build/build /usr/share/nginx/html