import * as React from 'react';
import Highlight, { defaultProps } from 'prism-react-renderer';
import propTypes from 'prop-types';
import theme from 'prism-react-renderer/themes/vsDark';
import lightTheme from 'prism-react-renderer/themes/nightOwlLight';
import { ThemeContext } from 'styled-components';
import { DeckContext } from '../hooks/use-deck';

const spaceSearch = /\S|$/;

const lineNumberStyles = {
  padding: '0 1em',
  borderRight: '1px solid hsla(0, 0%, 100%, 0.25)',
  flex: '0 1 30px',
  alignSelf: 'stretch'
};

export default function CodePane(props) {
  const canvas = React.useRef(document.createElement('canvas'));
  const context = React.useRef(canvas.current.getContext('2d'));
  const scrollContainerRef = React.useRef(null);
  const lineRef = React.useRef(null);
  const themeContext = React.useContext(ThemeContext);
  const {
    state: { printMode }
  } = React.useContext(DeckContext);
  const font = React.useMemo(() => {
    if (themeContext && themeContext.fonts && themeContext.fonts.monospace) {
      return themeContext.fonts.monospace;
    }
    const { platform } = navigator;
    if (platform.toLowerCase().search('win') !== -1) {
      return 'Consolas';
    } else if (platform.toLowerCase().search('mac') !== -1) {
      return 'Menlo';
    } else {
      return 'monospace';
    }
  }, [themeContext]);

  const fontSize = React.useMemo(() => {
    if (props && props.fontSize) {
      return props.fontSize;
    }

    if (
      themeContext &&
      themeContext.fontSizes &&
      themeContext.fontSizes.monospace
    ) {
      return themeContext.fontSizes.monospace;
    }

    // Default to 15px
    return 15;
  }, [themeContext, props.fontSize]);

  const preStyles = React.useMemo(
    () => ({
      fontFamily: font,
      fontSize: fontSize,
      maxHeight: themeContext.size.maxCodePaneHeight || 200,
      overflow: 'scroll',
      margin: 0,
      padding: '0.5em 1em 0.5em 0'
    }),
    [font, fontSize, themeContext]
  );

  const isLineDimmed = React.useCallback(
    lineNumber =>
      lineNumber < props.highlightStart || lineNumber > props.highlightEnd,
    [props.highlightStart, props.highlightEnd]
  );

  const measureIndentation = React.useCallback(
    indentation => {
      if (indentation === 0) {
        return 0;
      }
      const indentString = ' '.repeat(props.indentSize) || ' ';
      const string = indentString.repeat(indentation);
      context.current.font = `${props.fontSize}px ${font}`;
      const measurement = context.current.measureText(string);
      return measurement.width;
    },
    [props.fontSize, font]
  );

  // Auto-scroll to highlighted range
  React.useLayoutEffect(() => {
    const lineHeight = lineRef.current.clientHeight;
    const top = Math.max(0, (props.highlightStart - 1) * lineHeight);

    scrollContainerRef.current.scroll({
      top,
      behavior: 'smooth'
    });
  }, [lineRef.current, props.highlightStart]);

  return (
    <>
      <Highlight
        {...defaultProps}
        code={props.children}
        language={props.language}
        theme={printMode ? lightTheme : props.theme}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            ref={scrollContainerRef}
            className={`${className} ${props.autoFillHeight &&
              'spectacle-auto-height-fill'}`}
            style={{ ...style, ...preStyles }}
          >
            {tokens.map((line, i) => {
              const lineProps = getLineProps({ line, key: i });
              const lineIndentation = line[0].content.search(spaceSearch);

              lineProps.style = {
                ...(lineProps.style || {}),
                whiteSpace: 'pre-wrap',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                opacity: isLineDimmed(i + 1) ? 0.5 : 1
              };
              if (line[0].content && !line[0].empty) {
                line[0].content = line[0].content.trimLeft();
              }

              return (
                <div key={i} {...lineProps} ref={i === 0 ? lineRef : undefined}>
                  <div style={lineNumberStyles}>{i + 1}</div>
                  <div
                    style={{
                      marginLeft: measureIndentation(lineIndentation),
                      flex: 1,
                      paddingLeft: '0.25em'
                    }}
                  >
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token, key })} />
                    ))}
                  </div>
                </div>
              );
            })}
          </pre>
        )}
      </Highlight>
    </>
  );
}

CodePane.propTypes = {
  autoFillHeight: propTypes.bool,
  children: propTypes.string.isRequired,
  fontSize: propTypes.number,
  highlightEnd: propTypes.number,
  highlightStart: propTypes.number,
  indentSize: propTypes.number,
  language: propTypes.string.isRequired,
  theme: propTypes.object
};

CodePane.defaultProps = {
  language: 'javascript',
  theme: theme,
  highlightStart: -Infinity,
  highlightEnd: Infinity
};
