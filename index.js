import React from 'react';
import { render } from 'react-dom';

// TODO: This should be moved to `examples` along with `index.html` and not
// be in real repo root (unless this is our "cloned repo" example??)

// START: test components to try rendering:
import TestMDX from './examples/mdx/test-mdx';
// import TestJs from './examples/js/test-js';
// END: test components to try rendering

/**
 * Experiment to test MDX -> JSX transpilation through babel.
 *
 * Outputs MDXDocument, changing MDXDocument will cause webpack
 * to hot-reload with new contents.
 */

render(<TestMDX />, document.getElementById('root'));
