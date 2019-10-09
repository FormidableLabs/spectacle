import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import buble from 'rollup-plugin-buble';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';
import { terser } from 'rollup-plugin-terser';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import image from 'rollup-plugin-image';

import babelPreset from './babel';

const devServerPlugins = commandOptions => [
  serve({
    open: true,
    contentBase: '.',
    port: commandOptions.port
  }),
  livereload({
    watch: ['dist']
  })
];

const makePlugins = (isProduction = false, commandOptions) =>
  [
    nodeResolve({
      mainFields: ['module', 'jsnext', 'main'],
      browser: true
    }),
    image(),
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
    replace({
      'process.env.NODE_ENV': isProduction
    }),
    isProduction && terser(),
    ...(commandOptions.open ? devServerPlugins(commandOptions) : [])
  ].filter(Boolean);

export default makePlugins;
