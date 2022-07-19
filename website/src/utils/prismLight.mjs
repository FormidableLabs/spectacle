/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import lightTheme from 'prism-react-renderer/themes/github/index.cjs.js';

export default {
  ...lightTheme,
  styles: [
    ...lightTheme.styles,
    {
      types: ['function'],
      style: {
        color: 'var(--oss-color-primary)'
      }
    }
  ]
};
