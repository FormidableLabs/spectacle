'use strict';

/**
 * Super-simply static server that serves assets a la how unpkg would.
 */
const handler = require('serve-handler');

module.exports = async (request, response) => {
  await handler(request, response);
};
