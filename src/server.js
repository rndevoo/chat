// @flow

/**
 * @overview
 * The microservice's main service.
 *
 * It's a WebSocket server. It handles the realtime communication of the app.
 *
 * In production, we start the server directly here, for the env variables are
 * set in the web service, e.g. Heroku.
 *
 * In development, we export the start function @see {@link start} and call it
 * there @see {@link index.js} after loading all environmental variables.
 *
 * @author Diego Stratta <strattadb@gmail>
 * @license GPL-3.0
 */
'use strict';

import rabbitmq from 'amqplib';
import WebSocket from 'ws';

import { connectionHandler } from './handlers/connection';

import logger from './config/winston';

const PORT = process.env.PORT || 8080;
const NODE_ENV = process.env.NODE_ENV || 'development';

const RABBITMQ_SERVER_URL = process.env.RABBITMQ_SERVER_URL;

/**
 * In development we want to load env variables before we start the server.
 */
if (NODE_ENV === 'production') {
  start();
}

/**
 * @name start
 * @function
 *
 * @description
 * Just a wrapper for initializing and starting the server.
 */
export async function start () {
  // Connect to the RabbitMQ server.
  const conn = await rabbitmq.connect(RABBITMQ_SERVER_URL);
  // Crete the RabbitMQ channel.
  const channel = await conn.createChannel();

  // Create the WebSocket server instance and start listening.
  const wss = new WebSocket.Server({
    port: PORT,
  }, () => {
    logger.info(`Chat microservice's server running in ${NODE_ENV} mode on port ${PORT}`);
  });

  // Store all connected clients (WebSocket instances) here.
  let clients: Map<string, Object> = new Map();

  wss.on('connection', (ws) => connectionHandler(channel, ws, clients));
}
