# rndevoo's Chat Microservice

[![Greenkeeper badge](https://badges.greenkeeper.io/rndevoo/chat.svg)](https://greenkeeper.io/)
[![Build Status](https://travis-ci.org/rndevoo/chat.svg?branch=master)](https://travis-ci.org/rndevoo/chat)
[![CircleCI](https://circleci.com/gh/rndevoo/chat.svg?style=shield)](https://circleci.com/gh/rndevoo/chat)
[![Coverage Status](https://coveralls.io/repos/github/rndevoo/chat/badge.svg?branch=master)](https://coveralls.io/github/rndevoo/chat?branch=master)
[![David](https://david-dm.org/rndevoo/chat.svg)](https://david-dm.org/rndevoo/chat)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

## Introduction

This is rndevoo's chat microservice. It handles the real-time chat within the
app.

It is written in [TypeScript](https://www.typescriptlang.org).
Fully containerized using [Docker](https://docker.com).

It uses [RabbitMQ](https://www.rabbitmq.com) for inter-service communication
and [ws](https://github.com/websockets/ws) for the WebSockets server.

The tests are written with [Mocha](https://mochajs.org), [Chai](http://chaijs.com)
(expect variant) and [Sinon](http://sinonjs.org).

## Installation

### Getting the Code

Ideally, you'd want all rndevoo's services inside a folder,
so create a `rndevoo` folder somewhere:

```bash
$ mdkir -p ~/projects/rndevoo
$ cd ~/projects/rndevoo         # Change directory to the newly created.
```

Now clone the repository with [Git](https://git-scm.com):

```bash
$ git clone https://github.com/rndevoo/chat
```

### Common Configuration to All Services

You'll need Docker and Docker Compose installed in your machine.
If you don't have them, follow their guides:
[for Docker](https://docs.docker.com/engine/installation) and
[for Docker Compose](https://docs.docker.com/compose/gettingstarted).

Now, if it hasn't already been created, we need to create a custom
Docker network so we run all of our services containers and the RabbitMQ
server in the same network and they can communicate with each other.

So, check if the network already exists:

```bash
$ docker network ls | grep rndevoo_network
```

If nothing shows up, then create it:

```bash
$ docker network create --driver bridge rndevoo_network
```

Now we need to have a RabbitMQ server running in a docker container in order
to let the inter-service communication happen.

First check if it hasn't been created already:

```bash
$ docker ps -a | grep rabbit
```

If you see nothing, it is time to spin up a RabbitMQ container:

```bash
$ docker run -d --hostname rabbitmq --network rndevoo_network --name rabbit \
-p 15672:15672 -p 5672:5672 rabbitmq:3-management
```

If you want to access RabbitMQ's management panel,
go to `http://localhost:15672`.

To learn more about Docker [see their docs](https://docs.docker.com/engine/).

### Install System Requirements

You don't need [Node](https://nodejs.org) or [Yarn](https://yarnpkg.com),
because the Docker container has them, but it may be useful
to have them installed in your machine.

To install them, follow their guides:
[for Node](https://nodjes.org/en/download/package-manager) and
[for Yarn](https://yarnpkg.com/en/docs/install)

### Configure Environmental Variables

Generate your local `.env` file:

```shell
$ yarn run gen_env_file
```

Now that you have your local `.env` file, fill it!

### Install App Dependencies

```bash
$ yarn install
```

## Spinning Up the Development Container

Build and start the development container:

```bash
$ docker-compose up
```

In order to open a terminal session from inside the `web` Docker container run:

```bash
$ docker-compose exec web /bin/bash
```

To learn more about Docker Compose
[see their docs](https://docs.docker.com/compose/gettingstarted).

## Directory Layout

```bash
├── scripts/       # Useful scripts.
├── src/           # The source code. Contains unit tests.
│   ├── config/    # Configuration files of some modules (e.g. Winston).
│   ├── handlers/  # WebSocket server event handlers.
│   ├── utils/     # Utility functions.
│   └── server.ts  # The main server.
├── test/          # Integration tests.
```

## Testing

Run the tests:

```bash
$ yarn test
```

## Other Services and API Gateway

- [API Gateway](https://github.com/rndevoo/gateway)
- [Logging](https://github.com/rndevoo/logging)

## License

[GPL-3.0](https://www.gnu.org/licenses/gpl-3.0.en.html)
