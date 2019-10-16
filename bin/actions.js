const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const path = require('path');
const config = require('../webpack.config');

const port = 3000;

const options = {
  hot: true
};

const launchServer = (configUpdates = {}) => {
  const customConfig = { ...config, ...configUpdates };
  const server = new WebpackDevServer(webpack(customConfig), options);

  server.listen(port, 'localhost', function(err) {
    if (err) {
      console.log(err);
    }
    console.log('WebpackDevServer listening at localhost:', port);
  });
};

const launchMDXServer = (mdxFilePath, themeFilePath) => {
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
  if (themeFilePath) {
    alias['spectacle-user-theme'] = path.resolve(themeFilePath);
  } else {
    alias['spectacle-user-theme'] = config.resolve.alias['spectacle-user-theme'];
  }

  const configUpdates = {
    mode: 'development',
    context: cliRoot,
    entry: './mdx-slides/index.js',
    resolve: {
      alias,
      modules: [nodeModules]
    }
  };

  launchServer(configUpdates);
};

module.exports = {
  launchMDXServer
};
