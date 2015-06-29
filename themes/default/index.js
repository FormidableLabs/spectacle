var colors = {
  primary: '#f9c300',
  secondary: '#22aadd',
  tertiary: 'white'
};

var fonts = {
  primary: 'Open Sans Condensed',
  secondary: 'Lobster Two',
  tertiary: 'monospace'
}

module.exports = {
  colors: colors,
  fonts: fonts,
  global: {
    body: {
      background: colors.primary,
      fontFamily: fonts.primary,
      fontWeight: 'bold',
      fontSize: 16,
      color: '#22aadd'
    }
  },
  components: {
    blockquote: {},
    cite: {},
    content: {
      margin: 'auto'
    },
    codePane: {
      pre: {},
      code: {}
    },
    code: {},
    heading: {
      h1: {
        color: colors.tertiary,
        fontSize: '7em',
        fontFamily: fonts.primary,
        lineHeight: 1,
        margin: 0
      },
      h2: {
        color: colors.secondary,
        fontSize: '5.25em',
        fontFamily: fonts.primary,
        lineHeight: 1,
        margin: 0
      },
      h3: {
        color: 'black',
        fontSize: '3.9em',
        fontFamily: fonts.secondary,
        margin: '0.5em auto'
      },
      h4: {
        color: 'black',
        fontSize: '2.95em',
        fontFamily: fonts.primary,
        margin: '0.5em auto'
      },
      h5: {
        color: 'black',
        fontSize: '2.2em',
        fontFamily: fonts.primary,
        margin: '0.5em auto'
      },
      h6: {
        color: 'black',
        fontSize: '1.65em',
        fontFamily: fonts.primary,
        margin: '0.5em auto'
      }
    },
    image: {},
    listItem: {
      fontSize: '5vmin'
    },
    list: {
      textAlign: 'left',
      listStylePosition: 'inside',
      padding: 0
    },
    s: {
      strikethrough: {}
    },
    text: {}
  }
}