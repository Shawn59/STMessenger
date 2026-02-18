FROM node:12 as builder
WORKDIR /usr/src/app
COPY . .
RUN npm i && npm run build

FROM nginx:1.15.2
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/build/client .
COPY nginx/new-site.conf /etc/nginx/conf.d/default.conf

CMD /bin/bash -c "nginx -g 'daemon off;'"