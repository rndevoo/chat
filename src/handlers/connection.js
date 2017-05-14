// @flow

/**
 * @overview
 * The WebSocket server's connection event handler.
 */
'use strict';

import {
  validateUser,
  getPreviousMessages,
  getAllowedUsers,
} from './../utils/onConnection';

import {
  verifyRecipient,
  isUserConnected,
  sendMessage,
} from './../utils/onMessage';

/**
 * @name connectionHandler
 * @function
 *
 * @description
 * Handles the connection event.
 *
 * @param {Object} ws - The WebSocket server object.
 */
export async function connectionHandler (ws: Object) {
  let user: Object;
  try {
    user = await validateUser(ws);
  } catch (e) {
    /**
     * @todo communicate with the logging service to log this incident.
     */
  }
  const allowedUsers: Set<string> = await getAllowedUsers(userId);

  ws.on('message', async (message) => {
    if (message.type === 'message') {
      // Verify that the sender is allowed to send a message to this user.
      if (!await verifyRecipient(message.to, allowedUsers)) {

      }
    }
  });
}
