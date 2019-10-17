import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import buble from 'rollup-plugin-buble';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';
import { terser } from 'rollup-plugin-terser';

import image from 'rollup-plugin-image';

import mdx from './mdx-plugin/index';

import babelPreset from '../babel';

const makePlugins = (isProduction = false) =>
  [
    // run mdx files through our custom plugin first to ensure
    // babel (and buble) and transpile the generated JSX.
    mdx(),
    // resolve modules located in node_modules
    nodeResolve({
      // first look for `browser` and `module` fields in
      // module package.json to find ESM builds
      mainFields: ['module', 'jsnext', 'main'],
      browser: true
    }),
    // allow images to be directly imported á la webpack
    image(),
    // smooth over commonjs exports, converting them to an ES compatible version
    // so that they can be included in the rollup bundle
    commonjs({
      ignoreGlobal: true,
      include: /\/node_modules\//,
      namedExports: {
        // some modules have unresolvable named exports so we must
        // explicity define them.
        // Using Object.keys on the resolved module using node's
        // `require` module resolution algorithm is a nice trick
        // for doing this automatically.
        react: Object.keys(require('react')),
        'react-is': Object.keys(require('react-is'))
      }
    }),
    // run the code through buble first for some quick wins
    // that may run slower through babel.
    buble({
      include: ['*.js', '*.mdx'],
      transforms: {
        unicodeRegExp: false,
        dangerousForOf: true,
        dangerousTaggedTemplateString: true
      },
      exclude: 'node_modules/**'
    }),
    babel(babelPreset(isProduction)),
    // replace all instances of NODE_ENV with the passed env variable
    replace({
      'process.env.NODE_ENV': isProduction
    }),
    // minify the result in production
    isProduction && terser()
  ].filter(Boolean);

export default makePlugins;
