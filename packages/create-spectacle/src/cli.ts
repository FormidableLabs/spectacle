#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import chalk from 'chalk';
import cliSpinners from 'cli-spinners';
import logUpdate from 'log-update';
import prompts from 'prompts';
import {
  FileOptions,
  writeWebpackProjectFiles,
  writeOnePageHTMLFile
} from './templates/file-writers';
// @ts-ignore
import { version, devDependencies } from '../package.json';

const argv = yargs(hideBin(process.argv)).argv;
enum ArgName {
  type = 'type',
  name = 'name',
  lang = 'lang',
  port = 'port'
}

type CLIOptions = {
  [ArgName.type]: 'tsx' | 'jsx' | 'mdx' | 'onepage';
  [ArgName.name]: string;
  [ArgName.lang]?: string;
  [ArgName.port]?: number;
};

let progressInterval: NodeJS.Timer;
const log = console.log;
const printConsoleError = (message: string) =>
  chalk.whiteBright.bgRed.bold(' ! ') + chalk.red.bold(' ' + message + '\n');
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const main = async () => {
  log(chalk.whiteBright.bgMagenta.bold(' Spectacle CLI '));

  let i = 0;
  let type = argv[ArgName.type] || argv['t'];
  let name = argv[ArgName.name] || argv['n'];
  let lang = argv[ArgName.lang] || argv['l'] || 'en';
  let port = argv[ArgName.port] || argv['p'] || 3000;

  /**
   * If type/name not both provided via CLI flags, prompt for them.
   * TODO: Handle abort signal. If user aborts during prompt, we should respect that.
   */
  if (!(type && name)) {
    const response = await prompts([
      !type && {
        type: 'select',
        name: ArgName.type as string,
        message: 'What type of deck do you want to create?',
        choices: [
          { title: 'tsx', value: 'tsx' },
          { title: 'jsx', value: 'jsx' },
          { title: 'mdx', value: 'mdx' },
          { title: 'One Page', value: 'onepage' }
        ]
      },
      !name && {
        type: 'text',
        name: ArgName.name as string,
        message: 'What is the name of the presentation?',
        // TODO: Validate path doesn't already exist
        validate: async (val) => {
          return val.length > 0 ? true : 'Name is required';
        }
      },
      {
        type: 'text',
        name: ArgName.lang as string,
        message: 'What is the language code for the generated HTML document?',
        initial: lang,
        validate: (val) => {
          return val.length > 0 ? true : 'Language code is required';
        }
      },
      {
        type: 'number',
        name: ArgName.port as string,
        message: 'What port should the webpack dev server run on?',
        initial: port
      }
    ]);

    if (response.type) type = response.type;
    if (response.name) name = response.name;
    lang = response.lang;
    port = response.port;
  }

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
    spectacleVersion: devDependencies.spectacle
  };

  // switch (type) {
  //   case 'jsx':
  //     await writeWebpackProjectFiles(fileOptions);
  //     break;
  //   case 'tsx':
  //     await writeWebpackProjectFiles(fileOptions);
  //     break;
  //   case 'onepage':
  //     await writeOnePageHTMLFile(fileOptions);
  //     break;
  // }

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
