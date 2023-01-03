/**
 * We generally use `nps` for scripts that we:
 * 1. define at the root of the monorepo
 * 2. that are meant to execute _within_ a workspace
 *
 * ... or ...
 *
 * - That could use a little JS magic that we don't want to write a full
 *   node script for 😂
 *
 * For more cases, if you have an actual root task, define it in root
 * `package.json:scripts`.
 */

module.exports = {
  scripts: {
    // Build
    // - Typescript
    'types:create': 'tsc --emitDeclarationOnly',
    'types:check': 'tsc --noEmit',

    // - Babel
    'babel:pkg:base':
      'babel src --config-file ../../.babelrc.build.js --extensions .tsx,.ts,.jsx,.js',
    'babel:pkg:lib:esm':
      'cross-env BABEL_ENV=es nps "babel:pkg:base src --out-dir es"',
    'babel:pkg:lib:cjs':
      'cross-env BABEL_ENV=cjs nps "babel:pkg:base src --out-dir lib"',

    // - Webpack
    webpack: 'webpack',

    // Test
    jest: 'jest',

    // Quality.
    // - Format
    'prettier:base': 'prettier --list-different',
    'prettier:base:fix': 'prettier --write',
    'prettier:pkg':
      'nps prettier:base -- -- --config ../../.prettierrc --ignore-path ../../.prettierignore',
    'prettier:pkg:fix':
      'nps prettier:base:fix -- -- --config ../../.prettierrc --ignore-path ../../.prettierignore',
    'prettier:website':
      'nps prettier:base -- -- --config ../.prettierrc --ignore-path ../.prettierignore',
    'prettier:website:fix':
      'nps prettier:base:fix -- -- --config ../.prettierrc --ignore-path ../.prettierignore',

    // - Lint
    'lint:base': 'eslint --cache --color',
    'lint:pkg': 'nps lint:base -- -- src',
    'lint:pkg:fix': 'nps lint:base -- -- --fix src'
  }
};
