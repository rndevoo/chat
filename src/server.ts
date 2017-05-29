/**
 * @overview
 * The microservice's main service.
 *
 * It's a WebSocket server inside an AMQP connection.
 * It handles the real-time communication of the app.
 *
 * @author Diego Stratta <strattadb@gmail.com>
 * @license GPL-3.0
 */

import amqplib from 'amqplib';
import WebSocket from 'ws';

import { connectionHandler } from './handlers/connection';

import logger from './config/winston';

const PORT = process.env.PORT || 8080;
const NODE_ENV = process.env.NODE_ENV || 'development';

const RABBITMQ_SERVER_URL = process.env.RABBITMQ_SERVER_URL;

/**
 * @name main
 * @function
 *
 * @description
 * Just a wrapper for initializing and starting the server.
 */
export async function main () {
  // Connect to the RabbitMQ server.
  const conn = await amqplib.connect(RABBITMQ_SERVER_URL);
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

  wss.on('connection', (ws, req) => connectionHandler(channel, ws, req, clients));
}

main();
