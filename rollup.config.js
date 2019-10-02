import { basename } from 'path';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import buble from 'rollup-plugin-buble';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';
import { terser } from 'rollup-plugin-terser';

const pkgInfo = require('./package.json');
const name = basename(pkgInfo.main, '.js');

let external = ['dns', 'fs', 'path', 'url'];
if (pkgInfo.peerDependencies)
  external.push(...Object.keys(pkgInfo.peerDependencies));
if (pkgInfo.dependencies) external.push(...Object.keys(pkgInfo.dependencies));

// TODO: query-string does not have an ESM build, so we'll just bundle and ship it
external = external.filter(
  x => x !== 'query-string' && x !== 'styled-components'
);

const externalPredicate = new RegExp(`^(${external.join('|')})($|/)`);
const externalTest = id => {
  if (id === 'babel-plugin-transform-async-to-promises/helpers') {
    return false;
  }

  return externalPredicate.test(id);
};

const terserMinified = terser({
  sourcemap: true,
  warnings: true,
  ecma: 5,
  ie8: false,
  toplevel: true,
  compress: {
    keep_infinity: true,
    pure_getters: true,
    passes: 10
  },
  output: {
    comments: false
  }
});

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
    babel({
      babelrc: false,
      presets: [],
      plugins: [
        '@babel/plugin-transform-object-assign',
        [
          '@babel/plugin-transform-react-jsx',
          {
            pragma: 'React.createElement',
            pragmaFrag: 'React.Fragment',
            useBuiltIns: true
          }
        ],
        [
          'babel-plugin-transform-async-to-promises',
          {
            inlineHelpers: true,
            externalHelpers: true
          }
        ],
        [
          'babel-plugin-transform-react-remove-prop-types',
          {
            mode: isProduction ? 'remove' : 'wrap',
            removeImport: isProduction
          }
        ]
      ].filter(Boolean)
    }),
    isProduction &&
      replace({
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
    isProduction && terserMinified
  ].filter(Boolean);

const config = {
  input: pkgInfo.source || './src/index.js',
  external: externalTest,
  treeshake: {
    propertyReadSideEffects: false
  }
};

const globals = {
  react: 'React',
  'react-is': 'ReactIs',
  'react-dom': 'ReactDOM',
  'prop-types': 'PropTypes'
};

export default [
  {
    ...config,
    plugins: makePlugins(false),
    output: [
      {
        sourcemap: true,
        legacy: true,
        freeze: false,
        esModule: false,
        file: `./dist/${name}.js`,
        format: 'cjs'
      }
    ]
  },
  {
    ...config,
    external: id => console.log(id) || externalTest(id),
    plugins: [...makePlugins(false)],
    output: [
      {
        sourcemap: true,
        legacy: true,
        freeze: false,
        esModule: false,
        file: `./dist/${name}.es.js`,
        format: 'esm'
      }
    ]
  },
  {
    ...config,
    external: ['react', 'react-is', 'react-dom', 'prop-types'],
    plugins: [
      ...makePlugins(false),
      replace({
        'process.env.NODE_ENV': JSON.stringify('production')
      })
    ],
    output: [
      // UMD bundle
      {
        name: 'Spectacle',
        sourcemap: false,
        file: `./dist/one-page.umd.js`,
        format: 'umd',
        globals
      }
    ]
  },
  {
    ...config,
    external: () => false,
    plugins: [
      ...makePlugins(false),
      replace({
        'process.env.NODE_ENV': JSON.stringify('production')
      })
    ],
    output: [
      // one-page ESM bundle
      {
        sourcemap: false,
        file: `./dist/one-page.js`,
        format: 'esm'
      }
    ]
  },
  {
    ...config,
    plugins: makePlugins(true),
    output: [
      {
        sourcemap: true,
        legacy: true,
        freeze: false,
        file: `./dist/${name}.min.js`,
        format: 'cjs'
      },
      {
        sourcemap: true,
        legacy: true,
        freeze: false,
        file: `./dist/${name}.es.min.js`,
        format: 'esm'
      }
    ]
  }
];
