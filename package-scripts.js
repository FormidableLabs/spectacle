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
    // Quality.
    // - Format
    // TODO(wireit): IMPLEMENT
    'format:pkg':
      'prettier --config ../../.prettierrc.json --ignore-path ../../.prettierignore --list-different "./**/*.{js,jsx,json,ts,tsx}"',
    'format:pkg:fix':
      'prettier --config ../../.prettierrc.json --ignore-path ../../.prettierignore --write "./**/*.{js,jsx,json,ts,tsx}"',
    'format:root':
      'prettier --list-different "./*.js*" "./{scripts,config,demo,docs,stories,test}/*.{js,jsx,json,ts,tsx}"',
    'format:root:fix':
      'prettier --write "./*.js*" "./{scripts,config,demo,docs,stories,test}/*.{js,jsx,json,ts,tsx}"',

    // - Lint
    // TODO(wireit): IMPLEMENT
    'lint:base': 'eslint --cache --color',
    'lint:pkg': 'nps "lint:base src"',
    'lint:pkg:fix': 'nps "lint:base --fix src"'
  }
};
