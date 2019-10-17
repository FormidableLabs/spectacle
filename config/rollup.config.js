import path from 'path';

import makePlugins from './plugins/index';
import makeDevServerPlugins from './plugins/server';

const isProduction = process.env.NODE_ENV === 'production';

// default config that is used across all builds
const config = {
  input: 'index.js',
  treeshake: {
    // We assume reading a property of an object never has side-effects so we
    // disable this option as it can significantly reduce bundle size but
    // can potentially break functionality if you rely on getters or errors
    // from illegal property access.
    propertyReadSideEffects: false
  }
};

export default function makeConfig(commandOptions) {
  const builds = [];

  // iife build (for use with dev-server)
  const iife = {
    ...config,
    plugins: [
      ...makePlugins(isProduction),
      // if rollup has been ran with `--open`, include the dev server plugins
      ...(commandOptions.open ? makeDevServerPlugins(commandOptions) : [])
    ],
    output: {
      format: 'iife',
      name: 'Spectacle',
      file: path.join('dist', 'bundle.js')
    }
  };

  // UMD build
  const umd = {
    ...config,
    external: ['react', 'react-is', 'react-dom', 'prop-types'],
    plugins: [...makePlugins(isProduction)],
    output: [
      {
        name: 'Spectacle',
        sourcemap: false,
        file: `./dist/one-page.umd.js`,
        format: 'umd',
        // specify variable names for external imports
        globals: {
          react: 'React',
          'react-is': 'ReactIs',
          'react-dom': 'ReactDOM',
          'prop-types': 'PropTypes'
        }
      }
    ]
  };

  // if rollup has been ran via `--open` then only
  // include the dev-server IIFE build.
  if (commandOptions.open) {
    builds.push(...[iife]);
  }

  // if we are not running the dev-server, include all
  // default bundle builds.
  if (!commandOptions.open) {
    builds.push(...[iife, umd]);
  }

  return builds;
}
