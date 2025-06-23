# syntax=docker/dockerfile:1

######
# Docker create & run command to create the container
# CWD: this git repo
# docker build -t threejs-demo .
# docker run --rm -it --mount "type=bind,src=$(realpath .),dst=/home/me" threejs-demo
######

FROM ubuntu:latest@sha256:b59d21599a2b151e23eea5f6602f4af4d7d31c4e236d22bf0b62b86d2e386b8f
LABEL org.opencontainers.image.authors="kayhadrin@gmail.com"

# ARG	DEBIAN_FRONTEND=noninteractive

RUN apt-get update

# TODO: remove unnecessary packages below

# Perf monitoring tools
RUN apt-get install -y atop
RUN apt-get install -y htop
RUN apt-get install -y iotop
RUN apt-get install -y lsof

# Network tools
RUN apt-get install -y curl
RUN apt-get install -y dnsutils
RUN apt-get install -y iftop
RUN apt-get install -y inetutils-ping
RUN apt-get install -y net-tools

# Admin tools
RUN apt-get install -y sudo
RUN apt-get install -y openssh-server

# General utils
RUN apt-get install -y vim
RUN apt-get install -y bzip2
RUN apt-get install -y screen
RUN apt-get install -y unzip

# Development tools
RUN apt-get install -y git
RUN apt-get install -y graphviz
RUN curl -fsSL https://deb.nodesource.com/setup_23.x -o /tmp/nodesource_setup.sh \
	&& bash /tmp/nodesource_setup.sh \
	&& apt-get install -y nodejs \
	&& node -v

# RUN npm install --global corepack@latest 
# RUN corepack install -g pnpm@latest-10
## RUN corepack enable pnpm && corepack use pnpm@latest-10

# RUN wget -qO- https://get.pnpm.io/install.sh | ENV="$HOME/.bashrc" SHELL="$(which bash)" bash -

ENV LANG=en_US.utf8

# TODO: remove sudo privileges once we know what we eventually need at runtime
RUN echo 'ubuntu ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers

# ARG USERNAME
# ARG UID=1000
# ARG GID=1000
# RUN groupadd -g $GID $USERNAME -o || true
# RUN useradd -u $UID -o -g $GID -c "Docker user" -m -d /home -G sudo -s /bin/bash $USERNAME

# RUN useradd -c "Docker user" -m -d /home/me -G sudo -s /bin/bash me

# TODO: remove this? Only useful for root user during debugging
RUN cp /home/ubuntu/.bashrc /root/.bashrc

USER ubuntu
WORKDIR /home/ubuntu
ENV HOME=/home/ubuntu

RUN wget -qO- https://get.pnpm.io/install.sh | ENV="$HOME/.bashrc" SHELL="$(which bash)" bash -

ENTRYPOINT ["/bin/bash", "-l", "-c", "cd $HOME/app && bash -l"]
# ENTRYPOINT ["/bin/bash", "-l", "-c", "cd $HOME/app && $HOME/app/scripts/pnpm.sh install && bash -l"]