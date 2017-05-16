// @flow

/**
 * @overview
 * The WebSocket server's close event handler.
 */
 'use strict';

 import logger from '../config/winston';

 /**
  * @name closeHandler
  * @function
  *
  * @description
  * Handles the close event. Removes the disconnected user from the list of
  * connected users.
  *
  * @param  {Map<string, Object>} clients - The Map of connected clients.
  */
 export async function closeHandler (
   userId: string,
   clients: Map<string, Object>,
 ) {
   // Remove the user from the connected users.
   clients.delete(userId);
   logger.debug(`User with id: ${userId} went offline.`);
 }
