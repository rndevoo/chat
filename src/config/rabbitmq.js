// @flow

/**
 * @overview
 * Configuration for RabbitMQ message broker.
 */
'use strict';

import amqp from 'amqplib';

const AMQP_SERVER_URL = process.env.AMQP_SERVER_URL;

// Export the AMQP channel already connected to the server.
export const channel = amqp.connect(AMQP_SERVER_URL)
  .then((conn) => conn.createChannel());
