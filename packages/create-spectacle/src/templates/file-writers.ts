import path from 'path';
import { mkdir, writeFile, rm } from 'fs/promises';
import { htmlTemplate } from './html';
import { webpackTemplate } from './webpack';
import { babelTemplate } from './babel';
import { packageTemplate, vitePackageTemplate } from './package';
import { indexTemplate } from './index';
import { tsconfigTemplate } from './tsconfig';
import { gitignoreTemplate } from './gitignore';
import { readmeTemplate } from './readme';
import { viteConfigTemplate } from './viteConfig';
import { createOnePage } from '../generators/one-page';
import { markdownTemplate } from './markdown';

export type FileOptions = {
  snakeCaseName: string;
  name: string;
  lang: string;
  port: number;
  useMarkdownSlides?: boolean;
  spectacleVersion: string;
  isVite: boolean;
};

const prepForProjectWrite = async (fileOptions: FileOptions) => {
  const { name, lang, snakeCaseName, isVite } = fileOptions;

  const outPath = path.resolve(process.cwd(), snakeCaseName);
  const pathFor = (file: string) => path.join(outPath, file);

  // Clear out the directory if it already exists.
  await rm(outPath, { recursive: true, force: true });

  // Make new directory, and add some base files (shared between webpack and vite).
  await mkdir(outPath, { recursive: true });
  await writeFile(
    pathFor('index.html'),
    htmlTemplate({
      name,
      lang,
      entryFile: isVite ? '/index.tsx' : undefined
    })
  );
  await writeFile(
    pathFor('index.tsx'),
    indexTemplate({
      name,
      usesMarkdown: fileOptions.useMarkdownSlides
    })
  );
  await writeFile(pathFor('.gitignore'), gitignoreTemplate());
  await writeFile(pathFor('README.md'), readmeTemplate({ name, isVite }));
  await writeFile(pathFor('tsconfig.json'), tsconfigTemplate());
  fileOptions.useMarkdownSlides &&
    (await writeFile(pathFor('slides.md'), markdownTemplate({ name })));

  return { outPath, pathFor };
};

/**
 * Generate a webpack-based project
 */
export const writeWebpackProjectFiles = async (options: FileOptions) => {
  const { port, snakeCaseName, spectacleVersion } = options;
  const { pathFor } = await prepForProjectWrite(options);

  await writeFile(pathFor('webpack.config.js'), webpackTemplate({ port }));
  await writeFile(pathFor('.babelrc'), babelTemplate());
  await writeFile(
    pathFor('package.json'),
    packageTemplate({
      name: snakeCaseName,
      spectacleVersion
    })
  );
};

/**
 * Generate a vite-based project
 */
export const writeViteProjectFiles = async (options: FileOptions) => {
  const { snakeCaseName, spectacleVersion, port } = options;
  const { pathFor } = await prepForProjectWrite(options);

  await writeFile(
    pathFor('package.json'),
    vitePackageTemplate({
      name: snakeCaseName,
      spectacleVersion,
      port
    })
  );

  await writeFile(pathFor(`vite.config.ts`), viteConfigTemplate());
};

/**
 * Generate a one-page project
 */
export const writeOnePageHTMLFile = async ({
  snakeCaseName,
  name,
  lang
}: FileOptions) => {
  await writeFile(
    path.resolve(process.cwd(), `${snakeCaseName}.html`),
    createOnePage(name, lang)
  );
};
