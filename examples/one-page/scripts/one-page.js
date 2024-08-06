'use strict';

/**
 * Generate the JS `index.html` from `examples/js/index.js`
 */
const fs = require('fs').promises;
const path = require('path');

const { transformFileAsync } = require('@babel/core');
const pretty = require('pretty');

// Paths
const EXAMPLES = path.resolve(__dirname, '../..');
const SPECTACLE_PATH = path.resolve(__dirname, '../../../packages/spectacle');
const SRC_FILE = path.join(EXAMPLES, 'js/index.js');
const DEST_FILE = path.join(EXAMPLES, 'one-page/index.html');

// Dependencies.
const ESM_SH_VERSION = 'v121'; // v121, stable, etc.
const {
  dependencies,
  peerDependencies
} = require(`${SPECTACLE_PATH}/package.json`);
const reactPkgPath = require.resolve('react/package.json', {
  paths: [SPECTACLE_PATH]
});
const { version: reactVersion } = require(reactPkgPath);
const DEPS = `deps=react@${reactVersion}`;

// Toggle dev resources. (Use if debugging load / dependency errors).
const IS_DEV = false;
const DEV = IS_DEV ? '&dev' : '';

// Use local built spectacle? Toggle to `true` for dev-only.
// Note: Due to CORS, you'll need to run `pnpm run --filter ./examples/one-page start` and
// open http://localhost:5000/examples/one-page to work.
const USE_LOCAL = false;

// ================================================================================================
// Import Map
// ================================================================================================
const importUrl = (k, v, extra = '') => {
  // Pin react and react-dom.
  if (k === 'react' || k === 'react-dom') {
    v = reactVersion;
  }

  return `https://esm.sh/${ESM_SH_VERSION}/${k}@${v}${extra}?${DEPS}${DEV}`;
};

const getImportMap = () => {
  // Start with extra imports for one-page alone.
  const importMap = {
    htm: importUrl('htm', '^3'),
    spectacle: USE_LOCAL
      ? '../../packages/spectacle/lib/index.mjs'
      : 'https://esm.sh/spectacle@10?bundle'
  };

  Object.entries(Object.assign({}, dependencies, peerDependencies))
    .sort((a, b) => a[0].localeCompare(b[0]))
    .forEach(([k, v]) => {
      // General
      importMap[k] = importUrl(k, v);

      // Special case internal deps
      if (k === 'react') {
        importMap[`${k}/jsx-runtime`] = importUrl(k, v, '/jsx-runtime');
      }
      if (k === 'react-syntax-highlighter') {
        importMap[`${k}/dist/cjs/styles/prism/vs-dark.js`] = importUrl(
          k,
          v,
          '/dist/esm/styles/prism/vs-dark.js'
        );
        importMap[`${k}/dist/cjs/styles/prism/index.js`] = importUrl(
          k,
          v,
          '/dist/esm/styles/prism/index.js'
        );
      }
    });

  return importMap;
};

// ================================================================================================
// Rewriting
// ================================================================================================
const htmImport = `
import htm from 'htm';
const html = htm.bind(React.createElement);
`
  .replace(/  /gm, '')
  .trim();

const spectacleImportReplacer = (match, imports) => {
  // Prettify imports
  imports = imports
    .split(',')
    .map((i) => `  ${i.trim()}`)
    .join(`,\n`);

  return `import {\n${imports}\n} from 'spectacle';\n\n${htmImport}`;
};

const getSrcContent = async (src) => {
  let { code } = await transformFileAsync(src, {
    babelrc: false,
    configFile: false,
    plugins: ['babel-plugin-transform-jsx-to-htm']
  });

  // Mutate exports and comments.
  code = code
    // Mutate exports to our global imports.
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

      // Protect indentation of inline strings by temporarily wrapping in <pre>
      htm = htm
        .replace(/\n\${`/gm, '\n<pre>SPECTACLE_ONE_PAGE_TEMP_MARKER${`')
        .replace(/`}\n/gm, '`}SPECTACLE_ONE_PAGE_TEMP_MARKER</pre>\n');

      // Make the HTML pretty:
      htm = pretty(htm).replace(
        /<pre>SPECTACLE_ONE_PAGE_TEMP_MARKER|SPECTACLE_ONE_PAGE_TEMP_MARKER<\/pre>/g,
        ''
      );

      // Final tweaks:
      htm = `${open}${htm}${close}`
        // Initial newline
        .replace('html`<${', 'html`\n<${')
        // Indent
        .split('\n')
        .join('\n  ')
        // Handle pretty() erroneous newline after string literal
        .replace(/\${\"\n[ ]*/gm, '${"')
        // Final newline
        .replace('}>`;', '}>\n`;');

      return htm;
    }
  );

  return code;
};

// ================================================================================================
// Output
// ================================================================================================
const writeDestContent = async (destFile, code) => {
  // Format for indentation in index.html.
  const indent = '      ';
  code = `${indent}${code.split('\n').join(`\n${indent}`)}`;

  // Import map
  let importMap = JSON.stringify({ imports: getImportMap() }, null, 2);
  importMap = `${indent}${importMap.split('\n').join(`\n${indent}`)}`;

  // Get destination content.
  let destContent = (await fs.readFile(destFile)).toString();

  // Mutate in our updated code.
  destContent = destContent
    .replace(
      /(<script type="importmap">\n)[\s\S]*?(\n[ ]*<\/script>)/m,
      (match, open, close) => `${open}${importMap}${close}`
    )
    .replace(
      /(<script type="module">\n)[\s\S]*?(\n[ ]*<\/script>\n[ ]*<\/body>\n[ ]*<\/html>)/m,
      (match, open, close) => `${open}${code}${close}`
    )
    // Trim trailing spaces
    .split('\n')
    .map((line) => line.trimRight())
    .join('\n');

  // Update one-page
  await fs.writeFile(destFile, destContent);
};

const main = async () => {
  const code = await getSrcContent(SRC_FILE);
  await writeDestContent(DEST_FILE, code);
};

if (require.main === module) {
  main().catch((err) => {
    console.error(err); // eslint-disable-line no-console
    process.exit(1); // eslint-disable-line no-process-exit
  });
}
