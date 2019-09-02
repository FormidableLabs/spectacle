import * as React from 'react';
import Highlight, { defaultProps } from 'prism-react-renderer';
import propTypes from 'prop-types';
import theme from 'prism-react-renderer/themes/vsDark';

const spaceSearch = /\S|$/;

const lineNumberStyles = {
  padding: '0 1em',
  borderRight: '1px solid hsla(0, 0%, 0%, 0.25)',
  background: 'hsla(0, 0%, 0%, 0.1)',
  flex: '0 1 30px',
  alignSelf: 'stretch'
};

export default function CodePane(props) {
  const canvas = React.useRef(document.createElement('canvas'));
  const context = React.useRef(canvas.current.getContext('2d'));

  const font = React.useMemo(() => {
    if (props.font && props.font.trim().length > 0) {
      return props.font;
    }
    const { platform } = navigator;
    if (platform.toLowerCase().search('win') !== -1) {
      return 'Consolas';
    } else if (platform.toLowerCase().search('mac') !== -1) {
      return 'Menlo';
    } else {
      return 'monospace';
    }
  }, [props.font]);

  const preStyles = React.useMemo(
    () => ({
      fontFamily: font,
      fontSize: props.fontSize,
      margin: 0,
      padding: '0 1em 0 0'
    }),
    [font, props.fontSize]
  );

  const measureIndentation = React.useCallback(
    indentation => {
      if (indentation === 0) {
        return 0;
      }
      const string = ' '.repeat(indentation);
      context.current.font = `${props.fontSize}px ${font}`;
      const measurement = context.current.measureText(string);
      return measurement.width;
    },
    [props.fontSize, font]
  );

  return (
    <>
      <Highlight
        {...defaultProps}
        code={props.children}
        language={props.language}
        theme={theme}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className} style={{ ...style, ...preStyles }}>
            {tokens.map((line, i) => {
              const lineProps = getLineProps({ line, key: i });
              const lineIndentation = line[0].content.search(spaceSearch);
              lineProps.style = {
                ...(lineProps.style || {}),
                whiteSpace: 'pre-wrap',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start'
              };
              if (line[0].content && !line[0].empty) {
                line[0].content = line[0].content.trimLeft();
              }
              return (
                <div key={i} {...lineProps}>
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
  children: propTypes.string.isRequired,
  font: propTypes.string,
  fontSize: propTypes.number,
  language: propTypes.string.isRequired,
  theme: propTypes.object
};

CodePane.defaultProps = {
  language: 'javascript',
  theme: theme,
  fontSize: 15
};
