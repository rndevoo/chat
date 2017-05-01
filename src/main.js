// @flow

/**
 * @overview
 * The main server of the messages microservice, it contains the HTTP
 * and WebSocket servers.
 *
 * In production, we start the server directly here, for the env variables are
 * set in the web service, e.g. Heroku.
 *
 * In development, we export the start function @see {@link start} and call it
 * there @see {@link index.js} after loading all environmental variables.
 *
 * @author Diego Stratta <strattadb@gmail>
 * @license GPL-3.0
 */
'use strict';

import { server } from './ws';

import logger from './config/winston';
import { default as db, mongoConnectionString } from './config/db';

const PORT = process.env.PORT || 8080;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Connect to the MongoDB database.
db.open(mongoConnectionString);

/**
 * In development we want to load env variables before we start the server.
 */
if (NODE_ENV === 'production') {
  start();
}

/**
 * @name start
 * @function
 *
 * @description
 * Just a wrapper for starting the server.
 */
export function start () {
  server.listen(PORT, () => {
    logger.info(`Messages microservice server running in ${NODE_ENV} on port ${PORT}`);
  });
}
