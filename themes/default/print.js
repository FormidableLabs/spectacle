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
      borderLeft: `1px solid ${colors.primary}`,
      paddingLeft: 40,
      display: "block",
      color: "black",
      fontSize: "4.9rem",
      lineHeight: 1,
      fontWeight: "bold"
    },
    cite: {
      color: "black",
      display: "block",
      clear: "left",
      fontSize: "2rem",
      marginTop: "1rem"
    },
    content: {
      margin: "auto",
      textAlign: "center"
    },
    codePane: {
      pre: {
        maxWidth: 800,
        margin: "auto",
        fontSize: "1rem",
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
      fontSize: "2.66rem",
      fontFamily: fonts.tertiary,
      margin: "0.25rem auto",
      backgroundColor: "rgba(0,0,0,0.15)",
      padding: "0 10px",
      borderRadius: 3
    },
    heading: {
      h1: {
        color: "black",
        fontSize: "7.05rem",
        fontFamily: fonts.primary,
        lineHeight: 1,
        fontWeight: "bold",
        margin: 0
      },
      h2: {
        color: "black",
        fontSize: "5.88rem",
        fontFamily: fonts.primary,
        lineHeight: 1,
        fontWeight: "bold",
        margin: 0
      },
      h3: {
        color: "black",
        fontSize: "4.9rem",
        fontFamily: fonts.secondary,
        lineHeight: 1,
        fontWeight: "bold",
        margin: "0.5rem auto"
      },
      h4: {
        color: "black",
        fontSize: "3.82rem",
        fontFamily: fonts.primary,
        lineHeight: 1,
        fontWeight: "bold",
        margin: "0.5rem auto"
      },
      h5: {
        color: "black",
        fontSize: "3.19rem",
        fontFamily: fonts.primary,
        lineHeight: 1,
        fontWeight: "bold",
        margin: "0.5rem auto"
      },
      h6: {
        color: "black",
        fontSize: "2.66rem",
        fontFamily: fonts.primary,
        lineHeight: 1,
        fontWeight: "bold",
        margin: "0.5rem auto"
      }
    },
    image: {
      display: "block",
      margin: "0.5rem auto"
    },
    link: {
      textDecoration: "none"
    },
    listItem: {
      fontSize: "2.66rem"
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
      fontSize: "2.66rem",
      fontFamily: fonts.primary,
      margin: "0.25rem auto"
    }
  }
};
