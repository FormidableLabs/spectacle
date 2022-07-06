import { existsSync } from 'fs';
import { mkdir, writeFile } from 'fs/promises';
import { htmlTemplate } from './html';
import { onePageTemplate } from './one-page';

type FileOptions = {
  snakeCaseName: string;
  name: string;
};

export const writeBaseWebpackProjectFiles = async ({
  snakeCaseName,
  name
}: FileOptions) => {
  if (existsSync(snakeCaseName)) {
    throw new Error(`Directory named ${snakeCaseName} already exists.`);
  }
  await mkdir(snakeCaseName, { recursive: true });
  await writeFile(`${snakeCaseName}/index.html`, htmlTemplate({ name }));
};

export const writeOnePageHTMLFile = async ({
  snakeCaseName,
  name
}: FileOptions) => {
  await writeFile(`${snakeCaseName}.html`, onePageTemplate({ name }));
};
