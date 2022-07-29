type HTMLTemplateOptions = {
  name: string;
  lang: string;
};

export const htmlTemplate = (options: HTMLTemplateOptions) => `
<!DOCTYPE html>
<html lang="${options.lang}">
  <head>
    <title>${options.name}</title>
  </head>
  <body>
    <div id="app"></div>
  </body>
</html>
`;
