
ARG WORDPRESS_VERSION
ARG PHP_VERSION
FROM wordpress:${WORDPRESS_VERSION}-php${PHP_VERSION}-apache

LABEL author="Geoff Taylor <kidunot89@gmail.com>"

USER root

ARG NODE_VERSION
RUN apt-get update && \
    apt-get install -y --no-install-recommends gnupg && \
    curl -sL https://deb.nodesource.com/setup_${NODE_VERSION:-10}.x | bash - && \
    apt-get update && \
    apt-get install -y --no-install-recommends nodejs && \
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
    apt-get update && \
    apt-get install -y --no-install-recommends yarn