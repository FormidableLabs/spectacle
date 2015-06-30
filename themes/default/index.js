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
      fontSize: '2em',
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
      pre: {
        maxWidth: 800,
        margin: 'auto',
        fontSize: '1.5em',
        fontWeight: 'normal',
        fontFamily: fonts.tertiary
      },
      code: {
        textAlign: 'left',
        padding: 20
      }
    },
    code: {},
    heading: {
      h1: {
        color: colors.tertiary,
        fontSize: '7.05em',
        fontFamily: fonts.primary,
        lineHeight: 1,
        margin: 0
      },
      h2: {
        color: colors.secondary,
        fontSize: '5.88em',
        fontFamily: fonts.primary,
        lineHeight: 1,
        margin: 0
      },
      h3: {
        color: 'black',
        fontSize: '4.9em',
        fontFamily: fonts.secondary,
        margin: '0.5em auto'
      },
      h4: {
        color: 'black',
        fontSize: '3.82em',
        fontFamily: fonts.primary,
        margin: '0.5em auto'
      },
      h5: {
        color: 'black',
        fontSize: '3.19em',
        fontFamily: fonts.primary,
        margin: '0.5em auto'
      },
      h6: {
        color: 'black',
        fontSize: '2.66em',
        fontFamily: fonts.primary,
        margin: '0.5em auto'
      }
    },
    image: {},
    listItem: {},
    list: {
      textAlign: 'left',
      listStylePosition: 'inside',
      padding: 0,
      fontSize: '2.66em'
    },
    s: {
      strikethrough: {}
    },
    text: {
      color: 'black',
      fontSize: '2.66em',
      fontFamily: fonts.primary,
      margin: '0.25em auto'
    }
  }
}