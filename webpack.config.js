const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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

const mdxSlideLoader = path.resolve(__dirname, 'mdx-slide-loader');

const babelConfigOptions = {
  babelrc: false,
  presets: [require.resolve(presetEnv), require.resolve(presetReact)],
  plugins: [
    require.resolve(pluginObjectSpread),
    require.resolve(pluginClassProperties)
  ]
};

module.exports = {
  entry: './index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
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
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `./index.html`
    })
  ]
};
