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
    'babel:pkg:base': 'babel src --config-file ../../.babelrc.js --extensions .tsx,.ts,.jsx,.js',
    'babel:pkg:lib:esm': 'cross-env BABEL_ENV=es nps "babel:pkg:base src --out-dir es"',
    'babel:pkg:lib:cjs': 'cross-env BABEL_ENV=commonjs nps "babel:pkg:base src --out-dir lib"',

    //   // - UMD distributions
    //   // TODO(23`75): Add / verify caching
    //   // https://github.com/FormidableLabs/victory/issues/2375
    //   "build:dist:dev":
    //     "webpack --bail --config ../../config/webpack/webpack.config.dev.js",
    //   "build:dist:min":
    //     "webpack --bail --config ../../config/webpack/webpack.config.js",

    // Quality.
    // - Format
    // TODO(wireit): IMPLEMENT
    'prettier:base':
      'prettier --list-different "./**/*.{js,jsx,json,ts,tsx,css,md}"',
    'prettier:base:fix':
      'prettier --write "./**/*.{js,jsx,json,ts,tsx,css,md}"',
    'prettier:pkg':
      'nps "prettier:base --config ../../.prettierrc --ignore-path ../../.prettierignore"',
    'prettier:pkg:fix':
      'nps "prettier:base:fix --config ../../.prettierrc --ignore-path ../../.prettierignore"',

    // - Lint
    'lint:base': 'eslint --cache --color',
    'lint:pkg': 'nps "lint:base src"',
    'lint:pkg:fix': 'nps "lint:base --fix src"'
  }
};
