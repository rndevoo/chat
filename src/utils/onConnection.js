// @flow

/**
 * @overview
 * Helper function to use in the server's on connection event handler.
 */
'use strict';

/**
 * @name getPreviousMessages
 * @function
 *
 * @description
 * Returns the list of previous messages between two users.
 *
 * @param {string} user1 - The user 1.
 * @param {string} user2 - The user 2.
 *
 * @returns {Promise<Array<Object>>} The list of messages.
 */
export async function getPreviousMessages (
  user1: string,
  user2: string,
): Promise<Array<Object>> {
  /**
   * @todo Use RabbitMQ to talk to the corresponding microservice and
   * get the list.
   */

  return messages;
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
  /**
   * @todo Use RabbitMQ to talk to the corresponding microservice and
   * get the list.
   */

  const allowedUsers = new Set(users);

  return allowedUsers;
}
