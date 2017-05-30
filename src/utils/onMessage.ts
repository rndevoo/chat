/**
 * @overview
 * Helper functions to use in the server's on message event handler.
 */

/**
 * @name verifyRecipient
 * @function
 *
 * @description
 * Verifies that the user is authorized to sending messages to the recipient.
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
 */
export async function sendMessage (
  message: string,
  recipientConnection: WebSocket,
): Promise<void> {
  const payload = {
    type: 'message',
    message,
  };
  recipientConnection.send(payload);
}
