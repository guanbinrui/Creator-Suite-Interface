# WARNING: this dockerfile is for Github Workflow use only!
FROM nginx:alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY ./build .
