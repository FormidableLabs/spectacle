/**
 *  One-page loader script.
 */
/*global Babel:false*/

// Template for taking a render function and turning it into a presentation.
// TODO(RYAN): UPDATE THIS LIST ON OUTPUT OF ACTUAL LIB.
const template = (renderFn) => `
  (() => {
    const { Component } = React;
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

    class Presentation extends Component {
      render() {
        return renderFn();
      }
    }

    render(<Presentation/>, document.getElementById('root'));
  })();
`;

// Adapted from https://github.com/babel/babel-standalone/blob/master/src/transformScriptTags.js
const loadSpectacleScript = () => {
  const scripts = document.getElementsByTagName('script');

  // Load only our bespoke "text/spectacle" tags.
  for (let i = 0; i < scripts.length; i++) {
    const script = scripts.item(i);

    // Load first spectacle script.
    // (Mirrors the subset of `.babelrc` we expect to use in live presentations).
    if (script.type === 'text/spectacle') {
      const renderFn = script.innerHTML;
      const input = template(renderFn);
      const output = Babel.transform(input, {
        // TODO(RYAN): THIS NEEDS TO CHANGE AND BE VERIFIED
        // TODO(RYAN): IMPORT???
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
