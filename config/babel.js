const babelPreset = isProduction => ({
  babelrc: false,
  compact: false,
  presets: [],
  extensions: ['.mdx', '.js'],
  plugins: [
    '@babel/plugin-transform-object-assign',
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
