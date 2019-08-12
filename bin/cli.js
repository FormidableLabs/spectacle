#!/usr/bin/env node

const args = require('./args');
const actions = require('./actions');

const main = () =>
  Promise.resolve()
    // Parse arguments.
    .then(args.parse)
    .then(parsedInput => {
      const mdxFilePath = parsedInput.mdx;
      if (mdxFilePath) {
        actions.launchMDXServer(mdxFilePath);
      }
      // add future actions here
      else {
        throw new Error('Unsupported action.');
      }
    })
    .catch(err => {
      // Try to get full stack, then full string if not.
      console.error(err.stack || err.toString());
      process.exit(1);
    });

if (require.main === module) {
  main();
}
