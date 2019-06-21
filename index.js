import React from 'react';
import { render } from 'react-dom';

// START: test components to try rendering:
import MDXDocument from './examples/MDX/test.mdx';
// import TestJs from './examples/JS/TestJS.js';
// END: test components to try rendering

/**
 * Experiment to test MDX -> JSX transpilation through babel.
 *
 * Outputs MDXDocument, changing MDXDocument will cause webpack
 * to hot-reload with new contents.
 */

render(<MDXDocument />, document.getElementById('root'));
