'use strict';

/**
 * Generate a fully server-rendered HTML page.
 */
process.env.BABEL_ENV = 'cjs';

const path = require('path');
const requireFromString = require('require-from-string');
const React = require('react');
const ReactDOMServer = require('react-dom/server');

const { transformFileAsync } = require('@babel/core');

const SRC_FILE = path.resolve(__dirname, '../examples/js/index.js');
const SPECTACLE_CJS_PATH = path.resolve(__dirname, '../lib');

const getSrcContent = async src => {
  // Transform to Node-friendly form.
  let { code } = await transformFileAsync(src, {
    plugins: []
  });

  // Manually hack up some stuff.
  code = code
    // Switch to transpiled CJS
    .replace('require("spectacle");', `require("${SPECTACLE_CJS_PATH}")`)
    // Replace ReactDOM with an export.
    .replace(
      /^.*reactDom\.default\.render\(.*$/im,
      'module.exports = Presentation;'
    );

  return code;
};

const main = async () => {
  const code = await getSrcContent(SRC_FILE);
  const Presentation = requireFromString(code);
  const output = ReactDOMServer.renderToStaticMarkup(React.createElement(Presentation, null));
  console.log('TODO HERE', output);

};

if (require.main === module) {
  main().catch(err => {
    console.error(err); // eslint-disable-line no-console
    process.exit(1); // eslint-disable-line no-process-exit
  });
}
