// @flow

/**
 * @overview
 * Helper functions to use in the server's on message event handler.
 */

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

/**
 * @name verifyRecipient
 * @function
 *
 * @description
 * Verifies that the user is authorized to sending messages to the recipient.
 *
 * @param {string} to - The recipient's id.
 * @param {Set<string>} allowedUsers - The set of allowed users the sender is authorized to send messages to.
 *
 * @returns {Promise<boolean>} True if the sender is authorized. False otherwise.
 */
export async function verifyRecipient (
  to: string,
  allowedUsers: Set<string>,
): Promise<boolean> {
  return allowedUsers.has(to);
}

/**
 * @name isUserConnected
 * @function
 *
 * @description
 * Checks if the given user is connected to the WebSocket server.
 *
 * @param {string} userId - The id of the user to check connectivity.
 * @param {Set<string>} connectedUsers - The set of the connected users.
 *
 * @returns {boolean} True if the user is connected. False otherwise.
 */
export function isUserConnected (
  userId: string,
  connectedUsers: Set<string>,
): boolean {
  return connectedUsers.has(userId);
}

/**
 * @name sendMessage
 * @function
 *
 * @description
 * Sends the message to the recipient.
 *
 * It doesn't matter if the recipient isn't connected to the WebSocket server,
 * since it the message gets sent to the corresponding microservice to store it.
 *
 * @param {Object} ws - The WebSocket instance.
 * @param {string} to - The recipient's id.
 * @param {string} message - The message to send.
 */
export async function sendMessage (
  ws: Object,
  to: string,
  message: string,
): void {
  /**
   * @todo Do stuff.
   */
}
