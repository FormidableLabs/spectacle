import path from 'path';
import { existsSync } from 'fs';
import { mkdir, writeFile, rm } from 'fs/promises';
import { htmlTemplate } from './html';
import { onePageTemplate } from './one-page';
import { webpackTemplate } from './webpack';
import { babelTemplate } from './babel';
import { packageTemplate } from './package';
import { indexTemplate } from './index';
import { tsconfigTemplate } from './tsconfig';

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

  await rm(outPath, { recursive: true, force: true });

  if (existsSync(outPath)) {
    throw new Error(`Directory named ${snakeCaseName} already exists.`);
  }
  await mkdir(outPath, { recursive: true });
  await writeFile(`${snakeCaseName}/index.html`, htmlTemplate({ name, lang }));
  await writeFile(
    `${snakeCaseName}/webpack.config.js`,
    webpackTemplate({ port, usesTypeScript: enableTypeScriptSupport })
  );
  await writeFile(
    `${snakeCaseName}/.babelrc`,
    babelTemplate({ enableTypeScriptSupport })
  );
  await writeFile(
    `${snakeCaseName}/package.json`,
    packageTemplate({
      usesTypeScript: enableTypeScriptSupport,
      name: snakeCaseName,
      spectacleVersion
    })
  );
  await writeFile(
    `${snakeCaseName}/index.${enableTypeScriptSupport ? 'tsx' : 'jsx'}`,
    indexTemplate({
      usesTypeScript: enableTypeScriptSupport,
      name
    })
  );

  enableTypeScriptSupport &&
    (await writeFile(`${snakeCaseName}/tsconfig.json`, tsconfigTemplate()));
};

export const writeOnePageHTMLFile = async ({
  snakeCaseName,
  name,
  lang
}: FileOptions) => {
  await writeFile(`${snakeCaseName}.html`, onePageTemplate({ name, lang }));
};
