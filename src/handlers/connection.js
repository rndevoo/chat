// @flow

/**
 * @overview
 * The WebSocket server's connection event handler.
 */
'use strict';

import {
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

}
