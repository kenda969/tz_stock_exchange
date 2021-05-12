# Version: 0.0.1
FROM alpine:3.13
LABEL maintainer="Alex Lyashnevskiy Kenda969@gmail.com dev"
VOLUME /www
EXPOSE 80
RUN    apk add --update nginx \
    && rm -rf /var/cache/apk/* \
    && mkdir -p /run/nginx \
    && mkdir -p /www \
    && touch /run/nginx/nginx.pid \
    && chown -R nginx:nginx /www \
    && chown -R nginx:nginx /var/lib/nginx \
    && chown -R nginx:nginx /etc/nginx/http.d \
    && rm /etc/nginx/http.d/default.conf
COPY nginx/*.conf /etc/nginx/http.d/
RUN  ./usr/sbin/nginx
ENTRYPOINT ["nginx", "-g", "daemon off;"]
