const babelPreset = isProduction => ({
  // we do not want to use the .babelrc as all settings are defined here
  babelrc: false,
  // minify the result in production
  minified: isProduction,
  // include mdx files for transpilation *after* they have been
  // run through the custom mdx-plugin
  extensions: ['.mdx', '.js'],
  plugins: [
    '@babel/plugin-transform-object-assign',
    // we are not including the react preset so we must
    // include a couple of plugins to transform jsx and remove
    // prop types.
    [
      '@babel/plugin-transform-react-jsx',
      {
        pragma: 'React.createElement',
        pragmaFrag: 'React.Fragment',
        useBuiltIns: true
      }
    ],
    [
      'babel-plugin-transform-async-to-promises',
      {
        inlineHelpers: true,
        externalHelpers: true
      }
    ],
    [
      'babel-plugin-transform-react-remove-prop-types',
      {
        mode: isProduction ? 'remove' : 'wrap',
        removeImport: isProduction
      }
    ]
  ].filter(Boolean)
});

export default babelPreset;
