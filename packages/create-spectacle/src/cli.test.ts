import path from 'node:path';
import { exec } from 'node:child_process';
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
    await fs.rm(OUT_PATH, { recursive: true }).catch(() => {});
  });

  it('generates tsx (webpack) deck with expected files', async () => {
    await runCliWithArgs({ type: 'tsx', lang: 'foobar', port: 6969 });

    expect(await listFiles()).toEqual([
      '.babelrc',
      '.gitignore',
      'README.md',
      'index.html',
      'index.tsx',
      'package.json',
      'tsconfig.json',
      'webpack.config.js'
    ]);

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

    // README instructions for changing dist directory
    expect(await peakFile('README.md')).toContain(
      `\`output.path\` in \`webpack.config.js\``
    );

    // Custom lang/port
    expect(await peakFile('index.html')).toContain(`lang="foobar"`);
    expect(await peakFile('webpack.config.js')).toContain('6969');
  });

  it('generates jsx (webpack) deck with expected files', async () => {
    await runCliWithArgs({ type: 'jsx' });

    const files = await listFiles();
    expect(files).toEqual([
      '.babelrc',
      '.gitignore',
      'README.md',
      'index.html',
      'index.jsx',
      'package.json',
      'webpack.config.js'
    ]);
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

  it('generates tsx (vite) deck with expected files', async () => {
    await runCliWithArgs({ type: 'tsx-vite', lang: 'foobar', port: 6969 });

    expect(await listFiles()).toEqual([
      '.gitignore',
      'README.md',
      'index.html',
      'index.tsx',
      'package.json',
      'tsconfig.json',
      'vite.config.ts'
    ]);

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
        '@types/react',
        '@types/react-dom',
        '@vitejs/plugin-react',
        'typescript'
      ])
    );

    // Vite config should have react plugin
    expect(await peakFile('vite.config.ts')).toContain('plugins: [react()]');
    // Vite index.html should have entry point
    expect(await peakFile('index.html')).toContain(
      `<script type="module" src="/index.tsx"></script>`
    );

    // README instructions for changing dist directory
    expect(await peakFile('README.md')).toContain(
      `\`build.outDir\` in \`vite.config.ts`
    );

    // Custom lang/port
    expect(await peakFile('index.html')).toContain(`lang="foobar"`);
    expect(pak.scripts.start).toContain('--port 6969');
  });

  it('generates jsx (vite) deck with expected files', async () => {
    await runCliWithArgs({ type: 'jsx-vite' });

    expect(await listFiles()).toEqual([
      '.gitignore',
      'README.md',
      'index.html',
      'index.jsx',
      'package.json',
      'vite.config.js'
    ]);

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
        '@types/react',
        '@types/react-dom',
        '@vitejs/plugin-react'
      ])
    );

    // Vite config should have react plugin
    expect(await peakFile('vite.config.js')).toContain('plugins: [react()]');
    // Vite index.html should have entry point
    expect(await peakFile('index.html')).toContain(
      `<script type="module" src="/index.jsx"></script>`
    );

    // README instructions for changing dist directory
    expect(await peakFile('README.md')).toContain(
      `\`build.outDir\` in \`vite.config.js`
    );

    // Custom lang/port
    expect(await peakFile('index.html')).toContain(`lang="en"`);
    expect(pak.scripts.start).toContain('--port 3000');
  });

  it('generates a onepage file', async () => {
    await runCliWithArgs({ type: 'onepage' });

    const HTML_PATH = path.join(TMP_PATH, `${OUT_NAME}.html`);
    const contents = await fs
      .readFile(HTML_PATH, 'utf8')
      .then((buffer) => buffer.toString());

    // Should have deps
    const deps = [
      'https://unpkg.com/react@18.1.0/umd/react.production.min.js',
      'https://unpkg.com/react-dom@18.1.0/umd/react-dom.production.min.js',
      'https://unpkg.com/react-is@18.1.0/umd/react-is.production.min.js',
      'https://unpkg.com/prop-types@15.7.2/prop-types.min.js',
      'https://unpkg.com/spectacle@^9/dist/spectacle.min.js'
    ];
    deps.forEach((dep) => {
      expect(contents).toContain(`<script src="${dep}"></script>`);
    });
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
