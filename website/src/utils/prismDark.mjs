/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import darkTheme from 'prism-react-renderer/themes/dracula/index.cjs.js';

export default {
  ...darkTheme,
  plain: {
    backgroundColor: 'var(--oss-color-grey-darkest)'
  },
  styles: [
    ...darkTheme.styles,
    {
      types: ['function'],
      style: {
        color: 'var(--oss-color-primary-dark)'
      }
    }
  ]
};
