FROM node:10-alpine AS build
WORKDIR /build
COPY . .
RUN yarn
RUN yarn build

FROM nginx:alpine

COPY --from=build /build/build /usr/share/nginx/html