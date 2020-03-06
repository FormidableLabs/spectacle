// SURGEON GENERAL'S WARNING: THIS IS NOT A WEBPACK CONFIG, THIS IS A FUNCTION
// THAT ENHANCES THE BASE REACT-STATIC WEBPACK CONFIG.

const staticWebpackConfig = (config, { defaultLoaders }) => {
  // BUG/HACK: Disable CSS minification to avoid module build error:
  // "Module build failed: BrowserslistError: Unknown browser query `dead`"
  // https://github.com/FormidableLabs/spectacle/issues/857
  defaultLoaders.cssLoader.loader.forEach(({ loader, options }) => {
    if (loader === 'css-loader') {
      options.minimize = false;
    }
  });

  // Add development file info.
  config.output.pathinfo =
    config.output.pathinfo || process.env.REACT_STATIC_ENV === 'development';
  // No source maps.
  config.devtool = false;

  // Enhance rules.
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
