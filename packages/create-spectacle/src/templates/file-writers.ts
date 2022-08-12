import path from 'path';
import { mkdir, writeFile, rm } from 'fs/promises';
import { htmlTemplate } from './html';
import { onePageTemplate } from './one-page';
import { webpackTemplate } from './webpack';
import { babelTemplate } from './babel';
import { packageTemplate } from './package';
import { indexTemplate } from './index';
import { tsconfigTemplate } from './tsconfig';
import { gitignoreTemplate } from './gitignore';
import { readmeTemplate } from './readme';

export type FileOptions = {
  snakeCaseName: string;
  name: string;
  lang: string;
  port: number;
  enableTypeScriptSupport: boolean;
  spectacleVersion: string;
};

export const writeWebpackProjectFiles = async ({
  snakeCaseName,
  name,
  lang,
  port,
  enableTypeScriptSupport,
  spectacleVersion
}: FileOptions) => {
  const outPath = path.resolve(process.cwd(), snakeCaseName);
  const pathFor = (file: string) => path.join(outPath, file);

  await rm(outPath, { recursive: true, force: true });

  await mkdir(outPath, { recursive: true });
  await writeFile(pathFor('index.html'), htmlTemplate({ name, lang }));
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
    readmeTemplate({ name, enableTypeScriptSupport })
  );

  enableTypeScriptSupport &&
    (await writeFile(pathFor('tsconfig.json'), tsconfigTemplate()));
};

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
