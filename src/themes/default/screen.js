/*eslint-disable object-shorthand*/

import prismLight from './prism.light';
import prismDark from './prism.dark';

const defaultColors = {
  primary: '#f9c300',
  secondary: 'black',
  tertiary: 'white',
  quaternary: 'white'
};

const defaultFonts = {
  primary: 'Open Sans Condensed',
  secondary: 'Lobster Two',
  tertiary: 'monospace'
};

const screen = (colorArgs = defaultColors, fontArgs = defaultFonts) => {
  const colors = Object.assign({}, defaultColors, colorArgs);
  let normalizedFontArgs = {};
  let googleFonts = {};
  Object.keys(fontArgs).forEach(key => {
    const value = fontArgs[key];
    const fontName = value.hasOwnProperty('name') ? value.name : value;
    normalizedFontArgs = { ...normalizedFontArgs, [key]: fontName };
    if (value.hasOwnProperty('googleFont') && value.googleFont) {
      googleFonts = { ...googleFonts, [key]: value };
    }
  });
  const fonts = Object.assign({}, defaultFonts, normalizedFontArgs);
  return {
    colors: colors,
    fonts: fonts,
    googleFonts,
    global: {
      body: {
        background: colors.primary,
        fontFamily: fonts.primary,
        fontWeight: 'normal',
        fontSize: '2em',
        color: colors.secondary,
        overflow: 'hidden'
      },
      '_:-moz-tree-row(hover), .spectacle-deck': {
        perspective: '1000px'
      },
      '_:-moz-tree-row(hover), ul .appear': {
        display: 'inline'
      },
      'html, body': {
        width: '100%',
        height: '100%',
        margin: 0,
        padding: 0
      },
      '*': {
        boxSizing: 'border-box'
      }
    },
    fullscreen: {
      fill: colors.quaternary
    },
    autoplay: {
      pause: {
        position: 'absolute',
        top: 20,
        right: '50%',
        left: '50%',
        zIndex: 9999,
        background: 'none',
        border: 'none',
        outline: 0
      },
      pauseIcon: {
        fill: colors.tertiary
      },
      play: {
        position: 'absolute',
        top: 20,
        right: '50%',
        left: '50%',
        zIndex: 9999,
        background: 'none',
        border: 'none',
        outline: 0
      },
      playIcon: {
        fill: colors.tertiary
      }
    },
    controls: {
      prev: {
        position: 'absolute',
        top: '50%',
        left: 20,
        transform: 'translateY(-50%)',
        zIndex: 9999,
        background: 'none',
        border: 'none',
        outline: 0
      },
      prevIcon: {
        fill: colors.quaternary,
        transition: 'fill 1s ease-in-out 0.2s'
      },
      next: {
        position: 'absolute',
        top: '50%',
        right: 20,
        transform: 'translateY(-50%)',
        zIndex: 9999,
        background: 'none',
        border: 'none',
        outline: 0
      },
      nextIcon: {
        fill: colors.quaternary,
        transition: 'fill 1s ease-in-out 0.2s'
      }
    },
    prism: {
      light: prismLight,
      dark: prismDark
    },
    progress: {
      pacman: {
        container: {
          position: 'absolute',
          bottom: '5px',
          left: '50%',
          transition: 'all 1s ease-in-out 0.2s',
          zIndex: 1000
        },
        pacman: {
          position: 'absolute',
          transition: 'left 0.3s ease-in-out 0.2s',
          width: '20px',
          height: '20px',
          transform: 'translate(-5px, -5px)'
        },
        pacmanTop: {
          position: 'absolute',
          content: '',
          width: '20px',
          height: '10px',
          borderTopLeftRadius: '10px',
          borderTopRightRadius: '10px',
          transition: 'all 0.3s ease-out',
          background: colors.quaternary
        },
        pacmanBottom: {
          position: 'absolute',
          content: '',
          width: '20px',
          height: '10px',
          borderBottomLeftRadius: '10px',
          borderBottomRightRadius: '10px',
          background: colors.quaternary,
          transition: 'all 0.3s ease-out',
          top: '10px'
        },
        point: {
          position: 'absolute',
          float: 'left',
          background: 'transparent',
          width: '10px',
          height: '10px',
          borderWidth: 2,
          borderStyle: 'solid',
          borderColor: colors.quaternary,
          borderRadius: '50%',
          transition: 'all 0.3s ease-out'
        }
      },
      bar: {
        container: {
          position: 'absolute',
          height: '10px',
          width: '100%',
          bottom: 0,
          left: 0,
          transition: 'all 1s ease-in-out 0.2s',
          zIndex: 1000
        },
        bar: {
          height: '100%',
          background: colors.quaternary,
          transition: 'all 0.3s ease-out'
        }
      },
      number: {
        container: {
          position: 'absolute',
          bottom: 10,
          right: 10,
          zIndex: 1000,
          color: colors.quaternary,
          transition: 'all 0.3s ease-out'
        }
      }
    },
    components: {
      blockquote: {
        textAlign: 'left',
        position: 'relative',
        display: 'inline-block',
        margin: 20
      },
      quote: {
        borderLeft: `1px solid ${colors.primary}`,
        paddingLeft: 40,
        display: 'block',
        color: colors.primary,
        fontSize: '4.9rem',
        lineHeight: 1,
        fontWeight: 'bold'
      },
      cite: {
        color: colors.tertiary,
        display: 'block',
        clear: 'left',
        fontSize: '2rem',
        marginTop: '1rem'
      },
      content: {
        margin: '0 auto',
        textAlign: 'center'
      },
      codePane: {
        margin: 'auto',
        fontSize: '0.8rem',
        fontWeight: 'normal',
        minWidth: '100%',
        maxWidth: 800
      },
      syntax: {
        fontFamily: fonts.tertiary,
        fontSize: 'inherit',
        lineHeight: 1.5,
        direction: 'ltr',
        textAlign: 'left',
        wordSpacing: 'normal',
        wordBreak: 'normal',
        tabSize: 2,
        hyphens: 'none',
        whiteSpace: 'pre-wrap',
        padding: '0.5rem',
        margin: 0
      },
      code: {
        color: 'black',
        fontSize: '2.66rem',
        fontFamily: fonts.tertiary,
        margin: '0.25rem auto',
        backgroundColor: 'rgba(0,0,0,0.15)',
        padding: '0 10px',
        borderRadius: 3
      },
      goToAction: {
        borderRadius: '6px',
        fontFamily: fonts.primary,
        padding: '0.25em 1em',
        border: 'none',
        background: '#000',
        color: '#fff',
        '&:hover': {
          background: colors.tertiary,
          color: '#000'
        }
      },
      heading: {
        h1: {
          color: colors.tertiary,
          fontSize: '7.05rem',
          fontFamily: fonts.primary,
          lineHeight: 1,
          fontWeight: 'bold',
          margin: 0,
          zoom: 1
        },
        h2: {
          color: colors.secondary,
          fontSize: '5.88rem',
          fontFamily: fonts.primary,
          lineHeight: 1,
          fontWeight: 'bold',
          margin: 0
        },
        h3: {
          color: 'black',
          fontSize: '4.9rem',
          fontFamily: fonts.primary,
          lineHeight: 1,
          fontWeight: 'bold',
          margin: '0.5rem auto'
        },
        h4: {
          color: 'black',
          fontSize: '3.82rem',
          fontFamily: fonts.primary,
          lineHeight: 1,
          fontWeight: 'bold',
          margin: '0.5rem auto'
        },
        h5: {
          color: 'black',
          fontSize: '3.19rem',
          fontFamily: fonts.primary,
          lineHeight: 1,
          fontWeight: 'bold',
          margin: '0.5rem auto'
        },
        h6: {
          color: 'black',
          fontSize: '2.66rem',
          fontFamily: fonts.primary,
          lineHeight: 1,
          fontWeight: 'bold',
          margin: '0.5rem auto'
        }
      },
      image: {
        display: 'block',
        margin: '0.5rem auto'
      },
      link: {
        textDecoration: 'none'
      },
      listItem: {
        fontSize: '2.66rem'
      },
      list: {
        textAlign: 'left',
        listStylePosition: 'inside',
        padding: 0
      },
      s: {
        strikethrough: {}
      },
      tableHeaderItem: {
        fontSize: '2.66rem',
        fontWeight: 'bold'
      },
      tableItem: {
        fontSize: '2.66rem'
      },
      table: {
        width: '100%'
      },
      text: {
        color: 'black',
        fontSize: '2.66rem',
        fontFamily: fonts.primary,
        margin: '0.25rem auto'
      }
    }
  };
};

export default screen;
