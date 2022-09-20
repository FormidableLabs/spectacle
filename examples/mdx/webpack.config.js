const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Customized babel loader with the minimum we need to get `mdx` libraries
// working, which unfortunately codegen JSX instead of JS.
const babelLoader = {
  loader: require.resolve('babel-loader'),
  options: {
    // Use user-provided .babelrc
    babelrc: true,
    // ... with some additional needed options.
    presets: [require.resolve('@babel/preset-react')]
  }
};

/**
 * Base configuration for the CLI, core, and examples.
 */
module.exports = {
  mode: 'development',
  context: __dirname,
  entry: './index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'example.js'
  },
  externals: {},
  devtool: 'source-map',
  module: {
    // Not we use `require.resolve` to make sure to use the loader installed
    // within _this_ project's `node_modules` traversal tree.
    rules: [
      {
        test: /\.jsx?$/,
        use: [babelLoader]
      },
      // `.md` files are processed as pure text.
      {
        test: /\.md$/,
        use: [require.resolve('raw-loader')]
      },
      // `.mdx` files go through babel and mdx transforming loader.
      {
        test: /\.mdx$/,
        use: [babelLoader, require.resolve('spectacle-mdx-loader')]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [require.resolve('file-loader')]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Spectacle MDX Development Example',
      template: `./index.html`
    })
  ]
};
