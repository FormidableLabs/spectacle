#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import chalk from 'chalk';
import cliSpinners from 'cli-spinners';
import logUpdate from 'log-update';
import prompts from 'prompts';
import {
  FileOptions,
  writeWebpackProjectFiles,
  writeOnePageHTMLFile,
  writeViteProjectFiles
} from './templates/file-writers';
// @ts-ignore
import { version, devDependencies } from '../package.json';

const argv = yargs(hideBin(process.argv)).argv;
const cwd = process.cwd();

enum ArgName {
  type = 'type',
  name = 'name',
  lang = 'lang',
  port = 'port',
  overwrite = 'overwrite'
}

const DeckTypeOptions = [
  { title: chalk.cyan('tsx (webpack)'), value: 'tsx' },
  { title: chalk.yellow('jsx (webpack)'), value: 'jsx' },
  // TODO: Better colors for these...
  { title: chalk.bgCyan('tsx (vite)'), value: 'tsx-vite' },
  { title: chalk.bgYellow('jsx (vite)'), value: 'jsx-vite' },
  { title: chalk.green('One Page'), value: 'onepage' }
];

let progressInterval: NodeJS.Timer;
const log = console.log;
const printConsoleError = (message: string) =>
  chalk.whiteBright.bgRed.bold(' ! ') + chalk.red.bold(' ' + message + '\n');
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const main = async () => {
  log(chalk.whiteBright.bgMagenta.bold(' Spectacle CLI '));

  let i = 0;
  let type = argv[ArgName.type] || argv['t'];
  let name = argv['_']?.[0];
  let lang = argv[ArgName.lang] || argv['l'];
  let port = argv[ArgName.port] || argv['p'];

  const isTryingToOverwrite =
    Boolean(name) && !isOutputPathAvailable(name, type === 'onepage');

  /**
   * If type/name not both provided via CLI flags, prompt for them.
   */
  const hasType = Boolean(type);
  const hasName = Boolean(name);
  const hasLang = Boolean(lang);
  const hasPort = type === 'onepage' || Boolean(port); // onepage has no port

  if (!(hasType && hasName && hasLang && hasPort) || isTryingToOverwrite) {
    try {
      const response = await prompts(
        [
          // Name prompt
          {
            type: 'text',
            name: ArgName.name as string,
            message: 'What is the name of the presentation?',
            initial: name,
            validate: async (val) => {
              return val.trim().length > 0 ? true : 'Name is required';
            }
          },
          /**
           * Type of deck.
           * Needs to be before overwrite confirmation so we can determine if folder/file already exists.
           */
          {
            type: 'select',
            name: ArgName.type as string,
            message: 'What type of deck do you want to create?',
            choices: DeckTypeOptions,
            initial: (() => {
              const ind = DeckTypeOptions.findIndex((o) => o.value === type);
              return ind > -1 ? ind : 0;
            })()
          },
          // If output directory already exists, prompt to overwrite
          {
            type: (_, answers) =>
              isOutputPathAvailable(
                answers?.[ArgName.name],
                answers?.[ArgName.type] === 'onepage'
              )
                ? null
                : 'confirm',
            name: ArgName.overwrite as string,
            message: (_, answers) => {
              const name = answers?.[ArgName.name];
              const type = answers?.[ArgName.type];
              if (type === 'onepage') {
                return `File ${formatProjectOutputPath(
                  name
                )}.html already exists. Overwrite and continue?`;
              } else {
                return `Target directory ${formatProjectOutputPath(
                  name
                )} already exists. Overwrite and continue?`;
              }
            }
          },
          // Check overwrite comes back false, we need to abort.
          {
            type: (_, answers) => {
              if (answers?.[ArgName.overwrite] === false) {
                throw new Error('❌ Operation cancelled');
              }
              return null;
            },
            name: 'overwriteAborter'
          },
          // Language prompt
          {
            type: 'text',
            name: ArgName.lang as string,
            message:
              'What is the language code for the generated HTML document?',
            initial: lang || 'en',
            validate: async (val) => {
              return val.trim().length > 0 ? true : 'Language code is required';
            }
          },
          {
            // Don't prompt for this if onepage
            type: (_, answers) =>
              answers?.[ArgName.type] === 'onepage' ? null : 'text',
            name: ArgName.port as string,
            message: 'What port should the webpack dev server run on?',
            initial: port || '3000'
          }
        ],
        {
          onCancel: () => {
            throw new Error('❌ Operation cancelled');
          }
        }
      );

      if (response.type) type = response.type;
      if (response.name) name = response.name;
      lang = response.lang;
      port = response.port;
    } catch (err) {
      console.log(chalk.red(err.message));
      return;
    }
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
    snakeCaseName: formatProjectOutputPath(name),
    name,
    lang,
    port,
    enableTypeScriptSupport: /^tsx/.test(type),
    isVite: /vite$/.test(type),
    spectacleVersion: devDependencies.spectacle
  };

  switch (type) {
    case 'jsx':
    case 'tsx':
      await writeWebpackProjectFiles(fileOptions);
      break;
    case 'jsx-vite':
    case 'tsx-vite':
      await writeViteProjectFiles(fileOptions);
      break;
    case 'onepage':
      await writeOnePageHTMLFile(fileOptions);
      break;
  }

  clearInterval(progressInterval);
  const atLocation =
    type === 'onepage'
      ? `at ${fileOptions.snakeCaseName}.html`
      : `in ${fileOptions.snakeCaseName}/`;
  logUpdate(
    chalk.whiteBright.bgGreen.bold(` \u2714 `),
    chalk.green.bold(
      `A new ${type} deck named ${name} was created ${atLocation}.\n`
    )
  );
};

const formatProjectOutputPath = (name: string) =>
  name.toLowerCase().replace(/([^a-z0-9]+)/gi, '-');

const isOutputPathAvailable = (name: string, isHTMLFile = false) => {
  const outputPath = isHTMLFile
    ? path.join(cwd, `${formatProjectOutputPath(name)}.html`)
    : path.join(cwd, formatProjectOutputPath(name));
  return !fs.existsSync(outputPath);
};

main().catch((err) => {
  clearInterval(progressInterval);
  logUpdate(printConsoleError(err.message));
});
