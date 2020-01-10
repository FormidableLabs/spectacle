/**
 * Upload docs to surge.
 */
const path = require('path');
const chalk = require('chalk');
const execa = require('execa');

const PROJECT = 'spectacle';
const { TRAVIS_PULL_REQUEST, TRAVIS_JOB_NUMBER } = process.env;
const SRC = path.resolve(__dirname, '../../dist');
const DOMAIN = `formidable-com-${PROJECT}-staging-${TRAVIS_PULL_REQUEST}.surge.sh`;

const EXECA_OPTS = {
  stdio: 'inherit'
};

const { log } = console;
const logMsg = msg => log(chalk`[{cyan deploy/surge}] ${msg}`);

const main = async () => {
  if (!TRAVIS_PULL_REQUEST || TRAVIS_PULL_REQUEST === 'false') {
    logMsg(
      `Travis build: ${TRAVIS_JOB_NUMBER}. Skipping STAGING deployment for master / merge build.`
    );
    return;
  }

  logMsg(chalk`Uploading files to {cyan ${DOMAIN}}`);
  await execa('surge', ['--project', SRC, '--domain', DOMAIN], EXECA_OPTS);
};

if (require.main === module) {
  main().catch(err => {
    console.error(err); // eslint-disable-line no-console
    process.exit(1); // eslint-disable-line no-process-exit
  });
}
