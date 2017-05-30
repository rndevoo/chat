/**
 * @overview
 * Helper function to use in the server's on connection event handler.
 */

import { Channel, Message } from 'amqplib';
import { v4 as uuid } from 'uuid';

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
  ch: Channel,
  upgradeReq: any,
): Promise<object> {
  const authorizationHeader: string = upgradeReq.headers.Authorization;

  const queue = 'auth_validate';
  const replyTo: string = (await ch.assertQueue('', {
    exclusive: true,
  })).queue;

  // Create a correlation id.
  const corr: string = uuid();

  // Send the Authorization header to the queue.
  ch.sendToQueue(queue, Buffer.from(authorizationHeader), {
    correlationId: corr,
    replyTo,
  });

  return new Promise((resolve, reject) => {
    // Receive the response of the request.
    ch.consume(replyTo, (msg) => {
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
 */
export async function getAllowedUsers (
  ch: Channel,
  userId: string,
): Promise<Set<string>> {

  const queue = 'users_matches';
  // Generate a random queue to reply to.
  const replyTo: string = (await ch.assertQueue('', {
    exclusive: true,
  })).queue;

  // Create a correlation ID.
  const corr: string = uuid();

  ch.sendToQueue(queue, Buffer.from(userId), {
    correlationId: corr,
    replyTo,
  });

  // Receive the response of the request.
  const allowedUsersPromise: Promise<Set<string>> = new Promise((resolve) => {
    ch.consume(replyTo, (msg: Message): void => {
      // Check if the correlation id is the one we care about.
      if (msg.properties.correlationId === corr) {
        const { users }: {
          users: string[],
        } = JSON.parse(msg.content.toString());

        const allowedUsers = new Set(users);
        resolve(allowedUsers);
      }
    });
  });

  return allowedUsersPromise;
}
