#!/usr/bin/env node

const parse = require('./args').parse;

const main = () =>
  Promise.resolve()
    // Parse arguments.
    .then(parse)
    .then(out => {
      console.log(out);
    })
    .catch(err => {
      // Try to get full stack, then full string if not.
      console.error(err.stack || err.toString());

      process.exit(1);
    });

if (require.main === module) {
  main();
}
