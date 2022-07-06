type HTMLTemplateOptions = {
  name: string;
};

export const htmlTemplate = (options: HTMLTemplateOptions) => `
<!DOCTYPE html>
<html>
  <head>
    <title>${options.name}</title>
  </head>
  <body>
    <div id="app"></div>
  </body>
</html>
`;
