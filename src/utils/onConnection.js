// @flow

/**
 * @overview
 * Helper function to use in the server's on connection event handler.
 */
'use strict';

import uuid from 'uuid/v4';

/**
 * @name validateUser
 * @function
 *
 * @description
 * Checks if the given authentication token is valid or not.
 *
 * @param {Object} upgradeReq - The upgrade HTTP request.
 *
 * @returns {Promise<Object>} Object containing verified user information.
 */
export async function validateUser (
  channel: Object,
  upgradeReq: Object,
): Promise<Object> {
  const authorizationHeader: string = upgradeReq.headers.Authorization;

  const queue = 'auth_validate';
  const replyTo: string = (await channel.assertQueue('', {
    exclusive: true,
  })).queue;

  // Create a correlation id.
  const corr: string = uuid();

  // Send the Authorization header to the queue.
  channel.sendToQueue(queue, Buffer.from(authorizationHeader), {
    correlationId: corr,
    replyTo,
  });

  return new Promise((resolve, reject) => {
    // Receive the response of the request.
    channel.consume(replyTo, (msg) => {
      // Check if the correlation id is the one we care about.
      if (msg.properties.correlationId === corr) {
        const response = JSON.parse(msg.content.toString());

        // Check if the authorization header was valid.
        if (!response.ok) {
          reject('Authorization error.');
        }

        resolve(response.user);
      }
    });
  });
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
export async function getAllowedUsers (
  channel: Object,
  userId: string,
): Promise<Set<string>> {

  const queue = 'users_matches';
  // Generate a random queue to reply to.
  const replyTo: string = (await channel.assertQueue('', {
    exclusive: true,
  })).queue;

  // Create a correlation ID.
  const corr: string = uuid();

  channel.sendToQueue(queue, Buffer.from(userId), {
    correlationId: corr,
    replyTo,
  });

  // Receive the response of the request.
  return new Promise((resolve) => {
    channel.consume(replyTo, (msg) => {
      // Check if the correlation id is the one we care about.
      if (msg.properties.correlationId === corr) {
        const response = JSON.parse(msg.content.toString());

        const allowedUsers = new Set(response.users);
        resolve(allowedUsers);
      }
    });
  });
}
