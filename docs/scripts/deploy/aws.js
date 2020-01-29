/**
 * Upload docs to appropriate s3 subdirectory.
 */
const path = require('path');
const chalk = require('chalk');
const execa = require('execa');

const PROJECT = 'spectacle';
const DOCS_PATH = `open-source/${PROJECT}`;

const SRC = path.resolve(__dirname, '../../dist');
const BUCKET_NAME = 'formidable.com';
const DEST = `s3://${path.join(BUCKET_NAME, DOCS_PATH)}`;

const AWS_DRY_RUN_FLAG = '--dryrun';
const AWS_EXCLUDES = ['*.DS_Store*'];

// Cache values (in seconds)
const CACHE_MAX_AGE_DEFAULT = 10 * 60; // eslint-disable-line no-magic-numbers

const EXECA_OPTS = {
  stdio: 'inherit'
};

const { log } = console;
const logMsg = msg => log(chalk`[{cyan deploy/aws}] ${msg}`);

const main = async ({ isDryRun }) => {
  logMsg(chalk`Uploading files to {cyan ${DEST}}`);
  await execa(
    'aws',
    [
      's3',
      'sync',
      isDryRun ? AWS_DRY_RUN_FLAG : '',
      '--cache-control',
      `max-age=${CACHE_MAX_AGE_DEFAULT},public`,
      '--delete',
      ...AWS_EXCLUDES.reduce(
        (memo, exc) => memo.concat(['--exclude', exc]),
        []
      ),
      SRC,
      DEST
    ].filter(Boolean),
    EXECA_OPTS
  );
};

if (require.main === module) {
  main({
    isDryRun: process.argv.indexOf('--dryrun') > -1
  }).catch(err => {
    console.error(err); // eslint-disable-line no-console
    process.exit(1); // eslint-disable-line no-process-exit
  });
}
