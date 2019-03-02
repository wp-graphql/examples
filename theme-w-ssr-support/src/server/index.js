// server.js
/**
 * External dependencies
 */

/**
 * Local dependencies
 */
import server from './server';

server(context)
  .then(app => dispatch(JSON.stringify(app)))
  .catch(error => dispatch(JSON.stringify({ error })));
