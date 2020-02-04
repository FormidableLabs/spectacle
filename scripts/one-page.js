'use strict';

/**
 * Generate the JS `one-page.html` from `examples/js/index.js`
 */
const fs = require('fs').promises;
const path = require('path');

const { transformFileAsync } = require('@babel/core');
const pretty = require('pretty');

const SRC_FILE = path.resolve(__dirname, '../examples/js/index.js');
const DEST_FILE = path.resolve(__dirname, '../examples/one-page.html');

const htmImport = `
import htm from 'https://unpkg.com/htm@^3?module';
const html = htm.bind(React.createElement);
`
  .replace(/  /gm, '')
  .trim();

const spectacleImportReplacer = (match, imports) => {
  // Prettify imports
  imports = imports
    .split(',')
    .map(i => `  ${i.trim()}`)
    .join(`,\n`);

  return `const {\n${imports}\n} = Spectacle;\n\n${htmImport}`;
};

const getSrcContent = async src => {
  let { code } = await transformFileAsync(src, {
    babelrc: false,
    configFile: false,
    plugins: ['babel-plugin-transform-jsx-to-htm']
  });

  // Mutate exports and comments.
  code = code
    // Mutate exports to our global imports.
    .replace(/import React(|DOM) from 'react(|-dom)';[\n]*/gm, '')
    .replace(/import {[ ]*(.*)} from 'spectacle';/, spectacleImportReplacer)
    // Hackily fix / undo babel's poor control comment placment.
    .replace(/\/\/ SPECTACLE_CLI/gm, '\n// SPECTACLE_CLI')
    .replace(/(\/\/ SPECTACLE_CLI[^\n]*)[\n]{2}/gm, '$1\n')
    .replace(/(\/\/ SPECTACLE_CLI[^\n]*_START)/gm, '\n$1');

  // Beautify htm snippets.
  code = code.replace(
    /(html`)(<\${[\s\S]*?}>)(`;)/gm,
    (match, open, htm, close) => {
      // Initial cleanup for inline strings and functions
      htm = htm.replace(/>\${/gm, '>\n${').replace(/}<\/\${/gm, '}\n</${');

      const formatted = `${open}${pretty(htm)}${close}`
        // Initial newline
        .replace('html`<${', 'html`\n<${')
        // Indent
        .split('\n')
        .join('\n  ')
        // Final newline
        .replace('}>`;', '}>\n`;');

      return formatted;
    }
  );

  return code;
};

const writeDestContent = async (destFile, code) => {
  // Format for indentation in one-page.html.
  const indent = '      ';
  code = `${indent}${code}`;
  code = code.split('\n').join(`\n${indent}`);

  // Get destination content.
  let destContent = (await fs.readFile(destFile)).toString();

  // Mutate in our updated code.
  destContent = destContent
    .replace(
      /(<script type="module">\n)[\s\S]*?(\n[ ]*<\/script>\n[ ]*<\/body>\n[ ]*<\/html>)/m,
      (match, open, close) => `${open}${code}${close}`
    )
    // Trim trailing spaces
    .split('\n')
    .map(line => line.trimRight())
    .join('\n');

  // Update one-page
  await fs.writeFile(destFile, destContent);
};

const main = async () => {
  const code = await getSrcContent(SRC_FILE);
  await writeDestContent(DEST_FILE, code);
};

if (require.main === module) {
  main().catch(err => {
    console.error(err); // eslint-disable-line no-console
    process.exit(1); // eslint-disable-line no-process-exit
  });
}
