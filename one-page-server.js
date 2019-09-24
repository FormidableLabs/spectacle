'use strict';

/**
 * Super-simple static server that serves assets a la how unpkg would
 * with some aspects of Node.js `require` resolution.
 *
 * Run with:
 *
 * ```sh
 * $ micro one-page-server.js
 * ```
 */
const handler = require('serve-handler');
const path = require('path');
const fs = require('fs');
const { promisify } = require('util');
const { parse } = require('url');

const stat = promisify(fs.stat);

// Exists _and_ is a file.
const fileExists = (filePath) => stat(filePath)
  .then((stats) => stats.isFile())
  .catch((err) => {
    if (err.code === 'ENOENT') { return false; }
    throw err;
  });

const resolve = async (url) => {
  // Already resolved to a JS file.
  if (url.endsWith('.js')) { return url; }

  // Already exists.
  const { pathname } = parse(url);
  const pathExists = await fileExists(path.join('.', pathname));
  if (pathExists) { return url; }

  // Use Node.js `require`-type resolution semantics if file doesn't end in `.js`.
  // A sub-implementation of https://nodejs.org/api/modules.html#modules_all_together
  const jsExists = await fileExists(path.join('.', `${pathname}.js`));
  if (jsExists) { return url.replace(pathname, `${pathname}.js`); }

  const jsIndexExists = await fileExists(path.join('.', pathname, 'index.js'));
  if (jsIndexExists) { return url.replace(pathname, `${pathname}/index.js`); }

  // Base case: pass through.
  return url;
}

module.exports = async (req, res) => {
  req.url = await resolve(req.url);

  await handler(req, res);
};
