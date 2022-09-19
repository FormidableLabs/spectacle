type HTMLTemplateOptions = {
  name: string;
  lang: string;
  entryFile?: string;
};

export const htmlTemplate = (options: HTMLTemplateOptions) => `
<!DOCTYPE html>
<html lang="${options.lang}">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${options.name}</title>
  </head>
  <body>
    <div id="app"></div>
    ${
      options.entryFile
        ? `<script type="module" src="${options.entryFile}"></script>`
        : ''
    }
  </body>
</html>
`;
