// SURGEON GENERAL'S WARNING: THIS IS NOT A WEBPACK CONFIG, THIS IS A FUNCTION
// THAT ENHANCES THE BASE REACT-STATIC WEBPACK CONFIG.

const staticWebpackConfig = (config, { defaultLoaders }) => {
  config.devtool = false;
  config.module.rules = [
    {
      oneOf: [
        {
          test: /\.svg$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: Number.MAX_SAFE_INTEGER
              }
            }
          ]
        },
        {
          test: /\.md$/,
          use: 'raw-loader'
        },
        defaultLoaders.cssLoader,
        defaultLoaders.jsLoader,
        defaultLoaders.fileLoader
      ]
    }
  ];
  return config;
};

module.exports = staticWebpackConfig;
