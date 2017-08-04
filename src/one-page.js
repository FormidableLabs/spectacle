/**
 *  One-page loader script.
 */
/*global Babel:false*/

// Template for taking a render function and turning it into a presentation.
// TODO: createTheme / theme from example not supported because not exported.
const template = (renderFn) => `
  (() => {
    const { render } = ReactDOM;
    const {
      Appear,
      BlockQuote,
      Cite,
      CodePane,
      Code,
      ComponentPlayground,
      Deck,
      Fill,
      Fit,
      Heading,
      Image,
      Layout,
      Link,
      ListItem,
      List,
      Markdown,
      MarkdownSlides,
      Notes,
      Quote,
      S,
      Slide,
      SlideSet,
      TableBody,
      TableHeader,
      TableHeaderItem,
      TableItem,
      TableRow,
      Table,
      Text,
      Typeface
    } = Spectacle;

    const renderFn = ${renderFn};

    class Presentation extends React.Component {
      render() {
        return renderFn();
      }
    }

    render(<Presentation/>, document.getElementById('root'));
  })();
`;

const loadSpectacleScript = () => {
  // Adapted from https://github.com/babel/babel-standalone/blob/master/src/transformScriptTags.js
  const scripts = document.getElementsByTagName('script');

  // Load only our bespoke "text/spectacle" tags.
  for (let i = 0; i < scripts.length; i++) {
    const script = scripts.item(i);

    // Load first spectacle script.
    if (script.type === 'text/spectacle') {
      const renderFn = script.innerHTML;
      const input = template(renderFn);
      const output = Babel.transform(input, {
        presets: [
          [ 'es2015', { 'loose': true, 'modules': false } ],
          'stage-0',
          'react'
        ]
      }).code;

      eval(output); // eslint-disable-line no-eval

      break;
    }
  }
};

if (typeof window !== 'undefined' && window && window.addEventListener) {
  window.addEventListener('DOMContentLoaded', loadSpectacleScript, false);
}
