import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import buble from 'rollup-plugin-buble';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';

import babelPreset from './babel';

const makePlugins = (isProduction = false) =>
  [
    nodeResolve({
      mainFields: ['module', 'jsnext', 'main'],
      browser: true
    }),
    commonjs({
      ignoreGlobal: true,
      include: /\/node_modules\//,
      namedExports: {
        react: Object.keys(require('react')),
        'react-is': Object.keys(require('react-is'))
      }
    }),
    buble({
      transforms: {
        unicodeRegExp: false,
        dangerousForOf: true,
        dangerousTaggedTemplateString: true
      },
      objectAssign: 'Object.assign',
      exclude: 'node_modules/**'
    }),
    babel(babelPreset(isProduction)),
    isProduction &&
      replace({
        'process.env.NODE_ENV': JSON.stringify('production')
      })
  ].filter(Boolean);

export default makePlugins;
