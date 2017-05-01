// @flow

/**
 * @overview
 * The websocket server. It handles the realtime communication and storage of
 * messages in the database.
 */
'use strict';

import WebSocket from 'ws';

import { server } from './http';

import logger from './config/winston';

const wss = new WebSocket.Server({ server });

wss.on('connection', async (ws) => {
  logger.info('websocket connection established.');
});

export { server };
