// @flow

/**
 * @overview
 * The WebSocket server's connection event handler.
 */
'use strict';

import logger from '../config/winston';

import { closeHandler } from './close';

import {
  validateUser,
  getAllowedUsers,
} from './../utils/onConnection';

import {
  verifyRecipient,
  sendMessage,
} from './../utils/onMessage';

/**
 * @name connectionHandler
 * @function
 *
 * @description
 * Handles the connection event.
 *
 * @param {Object} channel - The RabbitMQ channel.
 * @param {Object} ws - The WebSocket server object.
 * @param {Map<string, Object>} clients - The connected WebSocket clients.
 */
export async function connectionHandler (
  channel: Object,
  ws: Object,
  clients: Map<string, Object>,
) {
  let user: Object;
  try {
    user = await validateUser(channel, ws);
  } catch (e) {
    /**
     * @todo communicate with the logging service to log this incident.
     */

    // Close the WebSocket connection. There's nothing to do anymore.
    return ws.close(401, 'Authentication Failed');
  }

  // Store the user WebSocket connection.
  clients.set(user.id, ws);

  const allowedUsers: Set<string> = await getAllowedUsers(channel, user.id);

  ws.on('message', async (message) => {
    if (message.type === 'message') {
      const recipientId: string = message.to;
      // Verify that the sender is allowed to send a message to this user.
      if (await verifyRecipient(allowedUsers, recipientId)) {
        // Try to get the WebSocket connection of the recipient.
        const recipientConnection = clients.get(recipientId);

        // If the recipient is connected send the message through the socket.
        if (recipientConnection) {
          await sendMessage(message.message, recipientConnection);
        } else {
          /**
           * @todo Store somewhere the messages to deliver them later
           * when the recipient is online.
           */
        }
      } else {
        ws.send({ type: 'error', error: 'Recipient not allowed.' });
        logger.warn('User attempted unauthorized communication.');
      }
    }
  });

  ws.on('close', () => closeHandler(user.id, clients));
}
