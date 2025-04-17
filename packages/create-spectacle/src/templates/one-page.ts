type OnePageTemplateOptions = {
  name: string;
  lang: string;
  importMap: Map<string, string>;
};

export const onePageTemplate = ({
  name,
  lang,
  importMap
}: OnePageTemplateOptions) => `
<!DOCTYPE html>
<html lang="${lang}">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>${name}</title>
  </head>
  <body>
    <div id="root"></div>

    <script type="importmap">
      {
        "imports": {
          ${Array.from(importMap.entries())
            .map(([pkg, url]) => `"${pkg}": "${url}"`)
            .join(',\n          ')}
        }
      }
    </script>

    <script type="module">
      import htm from 'htm';
      import React from 'react';
      import ReactDOM from 'react-dom/client';
      import {
        FlexBox,
        Heading,
        SpectacleLogo,
        Slide,
        Deck,
        DefaultTemplate
      } from 'spectacle';

      const html = htm.bind(React.createElement);
      const template = () => html\`<\${DefaultTemplate} />\`;

      const Presentation = () => html\`
        <\${Deck} template=\${template}>
          <\${Slide}>
            <\${FlexBox} height="100%">
              <\${Heading}>${name}</\${Heading}>
            </\${FlexBox}>
          </\${Slide}>
          <\${Slide}>
            <\${FlexBox} height="100%">
              <\${Heading} fontSize="h2">Made with</\${Heading}>
              <\${SpectacleLogo} size=${300} />
            </\${FlexBox}>
          </\${Slide}>
        </\${Deck}>
      \`;
      const root = ReactDOM.createRoot(document.getElementById('root'));
      root.render(html\`<\${Presentation}/>\`);
    </script>
  </body>
</html>
`;
