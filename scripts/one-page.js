'use strict';

/**
 * Generate the JS `one-page.html` from `examples/js/index.js`
 */
const fs = require('fs').promises;
const path = require('path');

const { transformFileAsync } = require("@babel/core");

const SRC_FILE = path.resolve(__dirname, '../examples/js/index.js');

const main = async () => {
  const { code } = await transformFileAsync(SRC_FILE, {
    babelrc: false,
    configFile: false,
    plugins: ['babel-plugin-transform-jsx-to-htm']
  });

  console.log("TODO HERE", code);
};

if (require.main === module) {
  main().catch(err => {
    console.error(err); // eslint-disable-line no-console
    process.exit(1); // eslint-disable-line no-process-exit
  });
}
