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
 * @param {Set<string>} allowedUsers - The set of allowed users the sender is authorized to send messages to.
 * @param {string} to - The recipient's id.
 *
 * @returns {Promise<boolean>} True if the sender is authorized. False otherwise.
 */
export async function verifyRecipient (
  allowedUsers: Set<string>,
  to: string,
): Promise<boolean> {
  return allowedUsers.has(to);
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
 * @param {string} message - The message to send.
 * @param {Object} recipientConnection - The WebSocket connection of the recipient.
 */
export async function sendMessage (
  message: string,
  recipientConnection: Object,
) {
  const payload = {
    type: 'message',
    message,
  };
  recipientConnection.send(payload);
}
