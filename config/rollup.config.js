import path from 'path';

import makePlugins from './plugins';

const isProduction = process.env.NODE_ENV === 'production';

const config = {
  input: 'index.js',
  treeshake: {
    propertyReadSideEffects: false
  }
};

export default function makeConfig(commandOptions) {
  return [
    {
      ...config,
      plugins: [...makePlugins(isProduction, commandOptions)],
      output: {
        format: 'iife',
        name: 'Spectacle',
        file: path.join('dist', 'bundle.js')
      }
    }
  ];
}
