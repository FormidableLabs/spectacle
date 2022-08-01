type WebpackTemplateOptions = {
  port: number;
  usesTypeScript: boolean;
};

export const webpackTemplate = (options: WebpackTemplateOptions) =>
  `const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  context: __dirname,
  entry: './index.${options.usesTypeScript ? 'tsx' : 'jsx'}',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'app.bundle.js'
  },
  devServer: {
    port: ${options.port}
  },
  module: {
    rules: [
      { test: /\\.[tj]sx?$/, use: ['babel-loader'] },
      { test: /\\.(png|svg|jpg|gif)$/, use: ['file-loader'] },
      { test: /\\.css$/, use: ['style-loader', 'css-loader'] }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './index.html' }),
  ]
};
`;
