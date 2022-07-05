#!/usr/bin/env node

import chalk from 'chalk';
import { Command } from 'commander';

const log = console.log;
const program = new Command();
const printConsoleError = chalk.whiteBright.bgRed.bold;

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
          printConsoleError(` ${message.substring(0, message.length - 1)} \n`)
        )
    })
    .requiredOption(
      '-t, --type <type>',
      'deck source type (choices: "tsx", "jsx", "mdx")'
    )
    .parse(process.argv);

  return;
};

main().catch((err) => log(printConsoleError(' Error: '), err.message));
