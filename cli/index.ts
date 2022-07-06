#!/usr/bin/env node

import chalk from 'chalk';
import { Command } from 'commander';
import cliSpinners from 'cli-spinners';
import logUpdate from 'log-update';
import {
  writeBaseWebpackProjectFiles,
  writeOnePageHTMLFile
} from './templates';

type CLIOptions = {
  type: 'tsx' | 'jsx' | 'mdx' | 'onepage';
  name: string;
};

let progressInterval: NodeJS.Timer;
const log = console.log;
const program = new Command();
const printConsoleError = (message: string) =>
  chalk.whiteBright.bgRed.bold(' ! ') + chalk.red.bold(' ' + message + '\n');
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const main = async () => {
  log(chalk.whiteBright.bgMagenta.bold(' Spectacle CLI '));

  program
    .name('spectacle-cli')
    .description('CLI to bootstrap Spectacle decks')
    .version('2.0.0')
    .showHelpAfterError()
    .configureOutput({
      outputError: (message, write) =>
        write(
          chalk.whiteBright.bgRed.bold(' ! ') +
            chalk.red.bold(' ' + message.replace('error: ', ''))
        )
    })
    .requiredOption(
      '-t, --type <type>',
      'deck source type (choices: "tsx", "jsx", "mdx", "onepage")'
    )
    .requiredOption('-n, --name [name]', 'name of presentation')
    .parse(process.argv);

  let i = 0;
  const { type, name } = program.opts<CLIOptions>();
  const snakeCaseName = name.toLowerCase().replace(/([^a-z0-9]+)/gi, '-');

  progressInterval = setInterval(() => {
    const { frames } = cliSpinners.aesthetic;
    logUpdate(
      chalk.whiteBright.bgBlue.bold(` ${frames[(i = ++i % frames.length)]} `),
      chalk.blue.bold('Building Deck')
    );
  }, cliSpinners.dots.interval);

  await sleep(750);

  switch (type) {
    case 'jsx':
      await writeBaseWebpackProjectFiles({
        snakeCaseName,
        name
      });
      break;
    case 'tsx':
      await writeBaseWebpackProjectFiles({
        snakeCaseName,
        name
      });
      break;
    case 'onepage':
      await writeOnePageHTMLFile({
        snakeCaseName,
        name
      });
      break;
  }

  clearInterval(progressInterval);
  logUpdate(
    chalk.whiteBright.bgGreen.bold(` \u2714 `),
    chalk.green.bold(`A new ${type} deck named ${name} was created.\n`)
  );
};

main().catch((err) => {
  clearInterval(progressInterval);
  logUpdate(printConsoleError(err.message));
});
