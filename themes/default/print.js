/*eslint-disable object-shorthand*/
const colors = {
  primary: "black",
  secondary: "black",
  tertiary: "black"
};

const fonts = {
  primary: "Open Sans Condensed",
  secondary: "Lobster Two",
  tertiary: "monospace"
};

module.exports = {
  colors: colors,
  fonts: fonts,
  global: {
    body: {
      background: "white",
      fontFamily: fonts.primary,
      fontWeight: "normal",
      fontSize: "2em",
      color: "black",
      overflow: "hidden"
    },
    ".hljs": {
      background: "white",
      color: "black"
    },
    ".hljs span": {
      color: "black !important"
    }
  },
  components: {
    blockquote: {
      textAlign: "left",
      position: "relative",
      display: "inline-block"
    },
    quote: {
      borderLeft: "1px solid " + colors.primary,
      paddingLeft: 40,
      display: "block",
      color: "black",
      fontSize: "4.9em",
      lineHeight: 1,
      fontWeight: "bold"
    },
    cite: {
      color: "black",
      display: "block",
      clear: "left",
      fontSize: "2em",
      marginTop: "1em"
    },
    content: {
      margin: "auto",
      textAlign: "center"
    },
    codePane: {
      pre: {
        maxWidth: 800,
        margin: "auto",
        fontSize: "1em",
        fontWeight: "normal",
        fontFamily: fonts.tertiary
      },
      code: {
        textAlign: "left",
        padding: 20,
        fontWeight: "normal"
      }
    },
    code: {
      color: "black",
      fontSize: "2.66em",
      fontFamily: fonts.tertiary,
      margin: "0.25em auto",
      backgroundColor: "rgba(0,0,0,0.15)",
      padding: "0 10px",
      borderRadius: 3
    },
    heading: {
      h1: {
        color: "black",
        fontSize: "7.05em",
        fontFamily: fonts.primary,
        lineHeight: 1,
        fontWeight: "bold",
        margin: 0
      },
      h2: {
        color: "black",
        fontSize: "5.88em",
        fontFamily: fonts.primary,
        lineHeight: 1,
        fontWeight: "bold",
        margin: 0
      },
      h3: {
        color: "black",
        fontSize: "4.9em",
        fontFamily: fonts.secondary,
        lineHeight: 1,
        fontWeight: "bold",
        margin: "0.5em auto"
      },
      h4: {
        color: "black",
        fontSize: "3.82em",
        fontFamily: fonts.primary,
        lineHeight: 1,
        fontWeight: "bold",
        margin: "0.5em auto"
      },
      h5: {
        color: "black",
        fontSize: "3.19em",
        fontFamily: fonts.primary,
        lineHeight: 1,
        fontWeight: "bold",
        margin: "0.5em auto"
      },
      h6: {
        color: "black",
        fontSize: "2.66em",
        fontFamily: fonts.primary,
        lineHeight: 1,
        fontWeight: "bold",
        margin: "0.5em auto"
      }
    },
    image: {
      display: "block",
      margin: "0.5em auto"
    },
    link: {
      textDecoration: "none"
    },
    listItem: {
      fontSize: "2.66em"
    },
    list: {
      textAlign: "left",
      listStylePosition: "inside",
      padding: 0
    },
    s: {
      strikethrough: {}
    },
    text: {
      color: "black",
      fontSize: "2.66em",
      fontFamily: fonts.primary,
      margin: "0.25em auto"
    }
  }
};
