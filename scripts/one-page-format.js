'use strict';

/**
 * Take codegen'ed one-page from stdin and do final transformations.
 */
const fs = require('fs').promises;
const path = require('path');

const main = async () => {
  const buf = await fs.readFile(
    path.resolve(__dirname, '../.temp-one-page.js')
  );
  const code = buf.toString();
  console.log('TODO HERE FORMAT HTML with pretty', code);
};

if (require.main === module) {
  main().catch(err => {
    console.error(err); // eslint-disable-line no-console
    process.exit(1); // eslint-disable-line no-process-exit
  });
}
