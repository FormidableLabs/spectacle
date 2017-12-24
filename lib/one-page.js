'use strict';

/**
 *  One-page loader script.
 */
/*global Babel:false*/

// Template for taking a render function and turning it into a presentation.
var template = function template(renderFn) {
  return '\n  (() => {\n    const { render } = ReactDOM;\n    const {\n      Appear,\n      BlockQuote,\n      Cite,\n      CodePane,\n      Code,\n      ComponentPlayground,\n      Deck,\n      Fill,\n      Fit,\n      Heading,\n      Image,\n      Layout,\n      Link,\n      ListItem,\n      List,\n      Markdown,\n      MarkdownSlides,\n      Notes,\n      Quote,\n      S,\n      Slide,\n      SlideSet,\n      TableBody,\n      TableHeader,\n      TableHeaderItem,\n      TableItem,\n      TableRow,\n      Table,\n      Text,\n      Typeface\n    } = Spectacle;\n\n    const renderFn = ' + renderFn + ';\n\n    class Presentation extends React.Component {\n      render() {\n        return renderFn();\n      }\n    }\n\n    render(<Presentation/>, document.getElementById(\'root\'));\n  })();\n';
};

// Adapted from https://github.com/babel/babel-standalone/blob/master/src/transformScriptTags.js
var loadSpectacleScript = function loadSpectacleScript() {
  var scripts = document.getElementsByTagName('script');

  // Load only our bespoke "text/spectacle" tags.
  for (var i = 0; i < scripts.length; i++) {
    var script = scripts.item(i);

    // Load first spectacle script.
    // (Mirrors the subset of `.babelrc` we expect to use in live presentations).
    if (script.type === 'text/spectacle') {
      var renderFn = script.innerHTML;
      var input = template(renderFn);
      var output = Babel.transform(input, {
        presets: [['es2015', { 'loose': true, 'modules': false }], 'stage-0', 'react']
      }).code;

      eval(output); // eslint-disable-line no-eval

      break;
    }
  }
};

if (typeof window !== 'undefined' && window && window.addEventListener) {
  window.addEventListener('DOMContentLoaded', loadSpectacleScript, false);
}