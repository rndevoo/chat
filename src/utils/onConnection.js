// @flow

/**
 * @overview
 * Helper function to use in the server's on connection event handler.
 */
'use strict';

import uuid from 'uuid/v4';

import { channel } from '../config/rabbitmq';

/**
 * @name validateUser
 * @function
 *
 * @description
 * Checks if the given authentication token is valid or not.
 *
 * @param {Object} ws - The WebSocket instance.
 *
 * @returns {Promise<Object>} Object containing verified user information.
 */
export async function validateUser (ws: Object): Promise<Object> {
  const authorizationHeader: string = ws.upgradeReq.headers.Authorization;

  const ch = await channel;

  const queue = 'auth_validate';
  const randomQueue: string = (await ch.assertQueue('', { exclusive: true })).queue;

  // Create a correlation id.
  const corr: string = uuid();

  // Send the Authorization header to the queue.
  ch.sendToQueue(queue, Buffer.from(authorizationHeader), {
    correlationId: corr,
    replyTo: randomQueue,
  });

  // Receive the response of the request.
  const msg = await ch.consume(randomQueue);

  // Check if the correlation id is the one we care about.
  if (msg.properties.correlationId !== corr) {
    throw new Error('Correlation ID didn\'t match.');
  }

  const response = JSON.parse(msg.content.toString());

  // Check if the authorization header was valid.
  if (!response.ok) {
    throw new Error('Authorization error.');
  }

  // Response the user object.
  return response.user;
}

/**
 * @name getAllowedUsers
 * @function
 *
 * @description
 * Returns the set of users the user is authorized to send messages to.
 *
 * @param {string} userId - The user's id.
 *
 * @returns {Promise<Set<string>>} The set of ids of the allowed users.
 */
export async function getAllowedUsers (userId: string): Promise<Set<string>> {
  const ch = await channel;

  const queue = 'users_matches';
  // Generate a random queue to reply to.
  const randomQueue: string = (await ch.assertQueue('', { exclusive: true })).queue;

  // Create a correlation ID.
  const corr: string = uuid();

  ch.sendToQueue(queue, Buffer.from(userId), {
    correlationId: corr,
    replyTo: randomQueue,
  });

  // Receive the response of the request.
  const msg = await ch.consume(randomQueue);

  // Check if the correlation id is the one we care about.
  if (msg.properties.correlationId !== corr) {
    throw new Error('Correlation ID didn\'t match.');
  }

  const response = JSON.parse(msg.content.toString());

  const allowedUsers = new Set(response.users);

  return allowedUsers;
}
