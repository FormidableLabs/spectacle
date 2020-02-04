'use strict';

/**
 * Generate the JS `one-page.html` from `examples/js/index.js`
 */
const fs = require('fs').promises;
const path = require('path');

const { transformFileAsync } = require("@babel/core");

const SRC_FILE = path.resolve(__dirname, '../examples/js/index.js');

const main = async () => {
  let { code } = await transformFileAsync(SRC_FILE, {
    babelrc: false,
    configFile: false,
    plugins: ['babel-plugin-transform-jsx-to-htm']
  });

  // Mutate exports and comments.
  code = code
    // Mutate exports to our global imports.
    .replace(/import React(|DOM) from 'react(|-dom)';[\n]*/gm, "")
    .replace(/from 'spectacle';/, 'from Spectacle;')
    // Hackily fix / undo babel's poor control comment placment.
    .replace(/\/\/ SPECTACLE_CLI/gm, '\n// SPECTACLE_CLI')
    .replace(/(\/\/ SPECTACLE_CLI[^\n]*)[\n]{2}/gm, '$1\n')
    .replace(/(\/\/ SPECTACLE_CLI[^\n]*_START)/gm, '\n$1')

  // Beautify htm snippets.
  // TODO

  // Output.
  process.stdout.write(code);
};

if (require.main === module) {
  main().catch(err => {
    console.error(err); // eslint-disable-line no-console
    process.exit(1); // eslint-disable-line no-process-exit
  });
}
