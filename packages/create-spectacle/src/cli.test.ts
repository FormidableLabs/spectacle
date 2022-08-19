import path from 'node:path';
import { spawn, exec } from 'node:child_process';
import fs from 'node:fs/promises';

const CLI_PATH = path.resolve(__dirname, '../bin/cli.js');
const TMP_PATH = path.resolve(__dirname, '../tmp');
const OUT_NAME = 'my-deck';
const OUT_PATH = path.join(TMP_PATH, OUT_NAME);

describe('create-spectacle', () => {
  beforeAll(async () => {
    await fs.mkdir(TMP_PATH, { recursive: true });
  });
  afterAll(async () => {
    await fs.rm(TMP_PATH, { recursive: true });
  });
  afterEach(async () => {
    await fs.rm(OUT_PATH, { recursive: true });
  });

  it('generates tsx deck with expected files', async () => {
    await runCliWithArgs({ type: 'tsx', lang: 'foobar', port: 6969 });

    expect(await listFiles()).toEqual(
      expect.arrayContaining([
        'README.md',
        'index.html',
        'index.tsx',
        'package.json',
        'tsconfig.json',
        'webpack.config.js'
      ])
    );

    // package.json fields
    const pak = JSON.parse(await peakFile('package.json'));
    expect(Object.keys(pak)).toEqual([
      'name',
      'private',
      'scripts',
      'dependencies',
      'devDependencies'
    ]);
    expect(Object.keys(pak.dependencies)).toEqual(
      expect.arrayContaining(['spectacle', 'react', 'react-dom'])
    );
    expect(Object.keys(pak.devDependencies)).toEqual(
      expect.arrayContaining([
        '@babel/core',
        '@babel/preset-env' /* ignoring a lot... */,
        'typescript',
        '@types/react'
      ])
    );

    // Custom lang/port
    expect(await peakFile('index.html')).toContain(`lang="foobar"`);
    expect(await peakFile('webpack.config.js')).toContain('6969');
  });

  it('generates jsx deck with expected files', async () => {
    await runCliWithArgs({ type: 'jsx' });

    const files = await listFiles();
    expect(files).toEqual(
      expect.arrayContaining([
        'README.md',
        'index.html',
        'index.jsx',
        'package.json',
        'webpack.config.js'
      ])
    );
    expect(files).not.toContain('tsconfig.json');

    // package.json fields
    const pak = JSON.parse(await peakFile('package.json'));
    expect(Object.keys(pak)).toEqual([
      'name',
      'private',
      'scripts',
      'dependencies',
      'devDependencies'
    ]);
    expect(Object.keys(pak.dependencies)).toEqual(
      expect.arrayContaining(['spectacle', 'react', 'react-dom'])
    );
    expect(Object.keys(pak.devDependencies)).not.toContain([
      'typescript',
      '@types/react'
    ]);

    // Custom lang/port
    expect(await peakFile('index.html')).toContain(`lang="en"`);
    expect(await peakFile('webpack.config.js')).toContain('3000');
  });
});

/**
 * Run the cli with certain args
 */
type Type = 'tsx' | 'jsx' | 'tsx-vite' | 'jsx-vite' | 'onepage';
const runCliWithArgs = ({
  type,
  lang = 'en',
  port = 3000
}: {
  type: Type;
  lang?: string;
  port?: number;
}) => {
  return new Promise((res) => {
    const cp = exec(
      `node ${CLI_PATH} ${OUT_NAME} -t ${type} -l ${lang} -p ${port}`,
      {
        cwd: TMP_PATH
      }
    );
    cp.on('exit', () => res(true));
  });
};

const listFiles = (targetDir = OUT_PATH) => fs.readdir(targetDir);

const peakFile = (filename: string) =>
  fs
    .readFile(path.join(OUT_PATH, filename))
    .then((buffer) => buffer.toString());
