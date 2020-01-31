codegen`
  const fs = require('fs');
  let code = fs.readFileSync(require.resolve('../examples/js/index.js'), 'utf8');

  code = code
    .replace(/import React(|DOM) from 'react(|-dom)';/g, '')
    // .replace(/import {$/, 'const {')
    // .replace(/from 'spectacle'/, '= Spectacle')

  module.exports = code;
`;
