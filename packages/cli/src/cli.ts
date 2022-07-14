#!/usr/bin/env node

import chalk from 'chalk';
import { Command } from 'commander';
import cliSpinners from 'cli-spinners';
import logUpdate from 'log-update';
import {
  FileOptions,
  writeWebpackProjectFiles,
  writeOnePageHTMLFile
} from './templates/file-writers';

type CLIOptions = {
  type: 'tsx' | 'jsx' | 'mdx' | 'onepage';
  name: string;
  lang?: string;
  port?: number;
};

let progressInterval: NodeJS.Timer;
const SPECTACLE_VERSION = '9.2.1';
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
    .option('-l, --lang [lang]', 'language code for generated HTML document')
    .option('-p, --port [port]', 'default port for webpack dev server')
    .parse(process.argv);

  let i = 0;
  const { type, name, lang = 'en', port = 3000 } = program.opts<CLIOptions>();

  progressInterval = setInterval(() => {
    const { frames } = cliSpinners.aesthetic;
    logUpdate(
      chalk.whiteBright.bgBlue.bold(` ${frames[(i = ++i % frames.length)]} `),
      chalk.blue.bold('Building Deck')
    );
  }, cliSpinners.dots.interval);

  await sleep(750);

  const fileOptions: FileOptions = {
    snakeCaseName: name.toLowerCase().replace(/([^a-z0-9]+)/gi, '-'),
    name,
    lang,
    port,
    enableTypeScriptSupport: type === 'tsx',
    spectacleVersion: SPECTACLE_VERSION
  };

  switch (type) {
    case 'jsx':
      await writeWebpackProjectFiles(fileOptions);
      break;
    case 'tsx':
      await writeWebpackProjectFiles(fileOptions);
      break;
    case 'onepage':
      await writeOnePageHTMLFile(fileOptions);
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
