import path from 'path';
import { mkdir, writeFile, rm } from 'fs/promises';
import { htmlTemplate } from './html';
import { onePageTemplate } from './one-page';
import { webpackTemplate } from './webpack';
import { babelTemplate } from './babel';
import { packageTemplate, vitePackageTemplate } from './package';
import { indexTemplate } from './index';
import { tsconfigTemplate } from './tsconfig';
import { gitignoreTemplate } from './gitignore';
import { readmeTemplate } from './readme';
import { viteConfigTemplate } from './viteConfig';

export type FileOptions = {
  snakeCaseName: string;
  name: string;
  lang: string;
  port: number;
  enableTypeScriptSupport: boolean;
  spectacleVersion: string;
  isVite: boolean;
};

const prepForProjectWrite = async (fileOptions: FileOptions) => {
  const { name, lang, snakeCaseName, enableTypeScriptSupport, isVite } =
    fileOptions;

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
      entryFile: isVite
        ? `/index.${enableTypeScriptSupport ? 'tsx' : 'jsx'}`
        : undefined
    })
  );
  await writeFile(
    pathFor(`index.${enableTypeScriptSupport ? 'tsx' : 'jsx'}`),
    indexTemplate({
      usesTypeScript: enableTypeScriptSupport,
      name
    })
  );
  await writeFile(pathFor('.gitignore'), gitignoreTemplate());
  await writeFile(
    pathFor('README.md'),
    readmeTemplate({ name, enableTypeScriptSupport, isVite })
  );
  enableTypeScriptSupport &&
    (await writeFile(pathFor('tsconfig.json'), tsconfigTemplate()));

  return { outPath, pathFor };
};

/**
 * Generate a webpack-based project
 */
export const writeWebpackProjectFiles = async (options: FileOptions) => {
  const { port, enableTypeScriptSupport, snakeCaseName, spectacleVersion } =
    options;
  const { pathFor } = await prepForProjectWrite(options);

  await writeFile(
    pathFor('webpack.config.js'),
    webpackTemplate({ port, usesTypeScript: enableTypeScriptSupport })
  );
  await writeFile(
    pathFor('.babelrc'),
    babelTemplate({ enableTypeScriptSupport })
  );
  await writeFile(
    pathFor('package.json'),
    packageTemplate({
      usesTypeScript: enableTypeScriptSupport,
      name: snakeCaseName,
      spectacleVersion
    })
  );
};

/**
 * Generate a vite-based project
 */
export const writeViteProjectFiles = async (options: FileOptions) => {
  const { enableTypeScriptSupport, snakeCaseName, spectacleVersion, port } =
    options;
  const { pathFor } = await prepForProjectWrite(options);

  await writeFile(
    pathFor('package.json'),
    vitePackageTemplate({
      usesTypeScript: enableTypeScriptSupport,
      name: snakeCaseName,
      spectacleVersion,
      port
    })
  );

  await writeFile(
    pathFor(`vite.config.${enableTypeScriptSupport ? 'ts' : 'js'}`),
    viteConfigTemplate()
  );
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
    onePageTemplate({ name, lang })
  );
};
