import path from 'node:path';
import { exec } from 'node:child_process';
import fs from 'node:fs/promises';
import { generateImportMap } from './generators/one-page';

const CLI_PATH = path.resolve(__dirname, '../bin/cli.js');
const TMP_PATH = path.resolve(__dirname, '../tmp');
const OUT_NAME = 'my-deck';
const OUT_PATH = path.join(TMP_PATH, OUT_NAME);

describe('create-spectacle', () => {
  /**
   * Some file/dir setup:
   * - Make tmp dir before suite
   * - Clean up tmp dir after suite
   * - After each test, try to clean up the generated files from that test.
   */
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

  it('generates a markdown deck with expected files', async () => {
    await runCliWithArgs({ type: 'md', lang: 'foobar', port: 6969 });

    expect(await listFiles()).toEqual([
      '.babelrc',
      '.gitignore',
      'README.md',
      'index.html',
      'index.tsx',
      'package.json',
      'slides.md',
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
    expect(await peakFile('slides.md')).toContain(
      `
--- { "layout" : "center" }
# my-deck

---
- Made with Spectacle
    `.trim()
    );
    expect(await peakFile('webpack.config.js')).toContain('6969');
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

  it('generates a onepage file', async () => {
    await runCliWithArgs({ type: 'onepage' });

    const HTML_PATH = path.join(TMP_PATH, `${OUT_NAME}.html`);
    const contents = await fs
      .readFile(HTML_PATH, 'utf8')
      .then((buffer) => buffer.toString());

    Array.from(generateImportMap().entries()).forEach(([pkg, url]) => {
      expect(contents).toContain(`"${pkg}": "${url}"`);
    });
  });
});

/**
 * Run the cli with certain args
 */
type Type = 'tsx' | 'md' | 'tsx-vite' | 'onepage';
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
