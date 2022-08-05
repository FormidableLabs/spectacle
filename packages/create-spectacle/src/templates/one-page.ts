type OnePageTemplateOptions = {
  name: string;
  lang: string;
};

export const onePageTemplate = ({ name, lang }: OnePageTemplateOptions) => `
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

    <script src="https://unpkg.com/react@18.1.0/umd/react.production.min.js"></script>
    <script src="https://unpkg.com/react-dom@18.1.0/umd/react-dom.production.min.js"></script>
    <script src="https://unpkg.com/react-is@18.1.0/umd/react-is.production.min.js"></script>
    <script src="https://unpkg.com/prop-types@15.7.2/prop-types.min.js"></script>
    <script src="https://unpkg.com/spectacle@^9/dist/spectacle.min.js"></script>

    <script type="module">
      const {
        FlexBox,
        Heading,
        SpectacleLogo,
        Slide,
        Deck,
      } = Spectacle;

      import htm from 'https://unpkg.com/htm@^3?module';
      const html = htm.bind(React.createElement);

      const Presentation = () => html\`
        <\${Deck}>
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
