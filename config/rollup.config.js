import makePlugins from './plugins';
import externalTest from './external';

const pkgInfo = require('../package.json');

const config = {
  input: pkgInfo.source || '../src/index.js',
  external: externalTest,
  treeshake: {
    propertyReadSideEffects: false
  }
};

// UMD module globals
const globals = {
  react: 'React',
  'react-is': 'ReactIs',
  'react-dom': 'ReactDOM',
  'prop-types': 'PropTypes'
};

export default [
  // UMD bundle
  {
    ...config,
    external: ['react', 'react-is', 'react-dom', 'prop-types'],
    plugins: [...makePlugins(true)],
    output: [
      {
        name: 'Spectacle',
        sourcemap: true,
        file: `./dist/one-page.umd.js`,
        format: 'umd',
        globals
      }
    ]
  }
];
