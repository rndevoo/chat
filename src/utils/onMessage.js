// @flow

/**
 * @overview
 * Helper functions to use in the server's on message event handler.
 */
'use strict';

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
  allowedUsers: Set<string>,
) {
  /**
   * @todo Do stuff.
   */
}
