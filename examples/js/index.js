import React from 'react';
import { render } from 'react-dom';

import TestJs from './test-js';

/**
 * Experiment to test MDX -> JSX transpilation through babel.
 *
 * Outputs MDXDocument, changing MDXDocument will cause webpack
 * to hot-reload with new contents.
 */

render(<TestJs />, document.getElementById('root'));
