/**
 *  One-page loader script.
 */
/*global Babel:false*/

// Template for taking a render function and turning it into a presentation.
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
      GoToAction,
      Layout,
      Link,
      ListItem,
      List,
      Magic,
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
      Typeface,
      themes
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
        'presets': ['@babel/preset-env', '@babel/preset-react'],
        'plugins': [
          '@babel/plugin-proposal-object-rest-spread',
          '@babel/plugin-proposal-class-properties'
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
