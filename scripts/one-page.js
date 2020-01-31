codegen`
  const fs = require('fs');
  let code = fs.readFileSync(require.resolve('../examples/js/index.js'), 'utf8');

  const extraImports = \`
= Spectacle;

import htm from 'https://unpkg.com/htm@^3?module';
const html = htm.bind(React.createElement);
  \`

  code = code
    .replace(/import React(|DOM) from 'react(|-dom)';/g, '')
    .replace(/import {\\s*\\n*\\s*Appear/m, 'const { Appear')
    .replace("from 'spectacle';", extraImports)
    .replace('// SPECTACLE', '// SPECTACLE')

  module.exports = code;
`;
