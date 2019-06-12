import React from 'react';
import { render } from 'react-dom';
import MDXDocument from './test.mdx';

/**
 * Experiment to test MDX -> JSX transpilation through babel.
 *
 * Outputs MDXDocument, changing MDXDocument will cause webpack
 * to hot-reload with new contents.
 */

render(<MDXDocument />, document.getElementById('root'));
