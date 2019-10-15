const path = require('path');

/**
 * Production library config.
 *
 * Used as a base, this produces with other configs:
 *
 * - `dist/spectacle.min.js`: production library
 * - `dist/spectacle.js`: development library
 * - `dist/example.js`: development example deck (not published to npm)
 */

/*
 * In order for the CLI to find loaders and babel configurations when
 * launching from another directory, we have to import the dependencies
 * explicitly from node_modules. Under the same circumstances, webpack
 * can not find the .babelrc file and so we must configure babel directly
 * in the webpack configuration.
 */
const babelLoader = path.resolve(__dirname, 'node_modules', 'babel-loader');
const presetEnv = path.resolve(__dirname, 'node_modules', '@babel/preset-env');
const presetReact = path.resolve(
  __dirname,
  'node_modules',
  '@babel/preset-react'
);
const pluginObjectSpread = path.resolve(
  __dirname,
  'node_modules',
  '@babel/plugin-proposal-object-rest-spread'
);
const pluginClassProperties = path.resolve(
  __dirname,
  'node_modules',
  '@babel/plugin-proposal-class-properties'
);

const mdxSlideLoader = path.resolve(__dirname, 'mdx-loader', 'index');

const babelConfigOptions = {
  babelrc: false,
  presets: [require.resolve(presetEnv), require.resolve(presetReact)],
  plugins: [
    require.resolve(pluginObjectSpread),
    require.resolve(pluginClassProperties)
  ]
};

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    library: 'Spectacle',
    libraryTarget: 'umd',
    path: path.join(__dirname, 'dist'),
    filename: 'spectacle.min.js'
  },
  devtool: 'source-map',
  // TODO: Confirm these are externals we want.
  // TODO: Document externals
  externals: {
    react: 'React',
    'react-dom': 'ReactDom',
    'react-is': 'ReactIs',
    'prop-types': 'PropTypes'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: {
          loader: require.resolve(babelLoader),
          options: babelConfigOptions
        }
      },
      {
        test: /\.mdx?$/,
        use: [
          {
            loader: require.resolve(babelLoader),
            options: babelConfigOptions
          },
          { loader: require.resolve(mdxSlideLoader) }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader']
      }
    ]
  },
  resolve: {
    alias: {
      'spectacle-user-theme': path.resolve(
        __dirname,
        './src/theme/backup-user-theme'
      )
    }
  }
};
