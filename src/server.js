// @flow

/**
 * @overview
 * The HTTP server. It handles the /messages endpoint.
 *
 * @author Diego Stratta <strattadb@gmail.com>
 * @license GPL-3.0
 */
'use strict';

import http from 'http';

import Koa from 'koa';
import koaLogger from 'koa-logger';
import bodyParser from 'koa-bodyparser';
import Boom from 'boom';

import queryParser from './middleware/queryParser';
import errorHandler from './middleware/errorHandler';
import router from './router';

const app = new Koa();

// Plug in the middleware.
app
  .use(errorHandler)
  .use(koaLogger())
  .use(queryParser)
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods({
    throw: true,
    notImplemented: () => Boom.notImplemented(),
    methodNotAllowed: () => Boom.methodNotAllowed(),
  }));

// We need the server created with the http module in order to use ws.
const server = http.createServer(app.callback());

/**
 * We export the HTTP server to hook the ws server later in ws.js
 * @see {@link ws.js}
 */
export { server };
