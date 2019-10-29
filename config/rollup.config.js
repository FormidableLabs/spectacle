import path from 'path';

import externalTest, { external } from './external';

import makePlugins from './plugins/index';
import makeDevServerPlugins from './plugins/server';

import unpkg from './plugins/unpkg-plugin/index';

const pkgInfo = require('../package.json');

const isProduction = process.env.NODE_ENV === 'production' || false;
const bundleName = `spectacle.${isProduction ? 'production.min' : 'development'}.js`;

// default config that is used across all builds
const config = {
  input: pkgInfo.source || './index.js',
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

  // dev-server example deck build 
  const example = {
    ...config,
    // dev-server uses index.js as an alternative entry point as we are building
    // an example application, rather than just building the library code.
    input: 'index.js',
    plugins: [
      // produce the development build for use with the dev-server
      ...makePlugins(false),
      // if rollup has been ran with `--open`, include the dev server plugins
      ...(commandOptions.open ? makeDevServerPlugins(commandOptions) : [])
    ],
    output: {
      format: 'iife',
      name: 'Spectacle',
      file: path.join('dist', 'example.js'),
      sourcemap: true
    }
  };

  // CJS build
  const makeCJS = () => ({
    ...config,
    external: externalTest,
    plugins: [...makePlugins(isProduction)],
    output: [
      {
        format: 'cjs',
        file: `./dist/cjs/${bundleName}`,
        sourcemap: false
      }
    ]
  });

  const makeESM = () => ({
    ...config,
    // These packages do not have a browser-ready ESM build, so we'll just
    // bundle and ship them
    external: external.filter(
      x => x !== 'query-string' && x !== 'styled-components' && x !== 'marksy'
    ),
    plugins: [...makePlugins(isProduction), !isProduction && unpkg()].filter(Boolean),
    output: {
      format: 'esm',
      file: `./dist/esm/${bundleName}`,
      sourcemap: false
    }
  })

  // UMD build
  const makeUmd = () => ({
    ...config,
    external: ['react', 'react-is', 'react-dom', 'prop-types'],
    plugins: [...makePlugins(isProduction)],
    output: [
      {
        name: 'Spectacle',
        sourcemap: false,
        file: `./dist/umd/${bundleName}`,
        format: 'umd',
        // specify variable names for external imports
        globals: {
          react: 'React',
          'react-is': 'ReactIs',
          'react-dom': 'ReactDOM',
          'prop-types': 'PropTypes',
        }
      }
    ]
  });

  // if rollup has been ran via `--open` then only
  // include the dev-server IIFE build.
  if (commandOptions.open) {
    builds.push(...[example]);
  }

  if (!commandOptions.open) {
    // if --format CLI flag has been used, only include the specified formats
    if (commandOptions.format) {
      const formats = commandOptions.format.split(',');
      builds.push(...[
        formats.includes('umd') && makeUmd(isProduction),
        formats.includes('cjs') && makeCJS(isProduction),
        formats.includes('esm') && makeESM(isProduction)
      ].filter(Boolean)
      )
    } else {
      // if the flag has been ommitted, include all build formats
      builds.push(...[makeUmd(isProduction), makeCJS(isProduction), makeESM(isProduction)]);
    }
  }

  return builds;
}
