const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const path = require('path');
const config = require('../webpack.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const spectacleComponents = [
  'Deck',
  'Slide',
  'Appear',
  'CodePane',
  'Box',
  'FlexBox',
  'Grid',
  'Image',
  'FullSizeImage',
  'OrderedList',
  'Quote',
  'Heading',
  'ListItem',
  'UnorderedList',
  'Text',
  'Link',
  'CodeSpan',
  'Notes',
  'Progress',
  'FullScreen',
  'Markdown',
  'Table',
  'TableCell',
  'TableRow'
]

const options = {
  hot: true
};

const launchServer = (configUpdates = {}, port) => {
  const customConfig = { ...config, ...configUpdates };
  const server = new WebpackDevServer(webpack(customConfig), options);

  server.listen(port, 'localhost', function (err) {
    if (err) {
      console.log(err);
    }
    console.log('WebpackDevServer listening at localhost:', port);
  });
};

const launchMDXServer = (mdxFilePath, themeFilePath, templateFilePath, title, port = 3000) => {
  if (!mdxFilePath) {
    // developer error - must supply an entry file path
    throw new Error('MDX file path must be provided.');
  }

  const cliRoot = path.resolve(__dirname, '..');
  const absoluteMdxFilePath = path.resolve(mdxFilePath);
  const nodeModules = path.resolve(__dirname, '../node_modules');

  const alias = {
    'spectacle-user-mdx': absoluteMdxFilePath
  };
  const plugins = [
    new HtmlWebpackPlugin({
      template: `./index.html`,
      title: title || 'Spectacle - Getting Started'
    })
  ]

  if (themeFilePath) {
    alias['spectacle-user-theme'] = path.resolve(themeFilePath);
  } else {
    alias['spectacle-user-theme'] =
      config.resolve.alias['spectacle-user-theme'];
  }

  if (templateFilePath) {
    const componentMap = spectacleComponents.reduce((acc, comp) => {
      acc[comp] = [path.resolve(path.join(__dirname, '../', 'src')), comp];
      return acc;
    }, {});
    plugins.push(
      new webpack.ProvidePlugin(componentMap)
    )

    alias['spectacle-user-template'] = path.resolve(templateFilePath);
  } else {
    alias['spectacle-user-template'] = config.resolve.alias['spectacle-user-template'];
  }

  const configUpdates = {
    mode: 'development',
    context: cliRoot,
    entry: './mdx-slides/index.js',
    output: {
      filename: 'spectacle.js'
    },
    resolve: {
      alias,
      modules: [nodeModules]
    },
    externals: {},
    plugins
  };

  launchServer(configUpdates, port);
};

module.exports = {
  launchMDXServer
};
