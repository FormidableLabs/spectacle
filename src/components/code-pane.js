import * as React from 'react';
import Highlight, { defaultProps } from 'prism-react-renderer';
import propTypes from 'prop-types';
import theme from 'prism-react-renderer/themes/vsDark';
import { GoogleFont } from 'react-typography';

export default function CodePane(props) {
  const typography = React.useMemo(
    () => ({
      options: {
        googleFonts: [
          {
            name: props.googleFont,
            styles: ['400']
          }
        ]
      }
    }),
    [props.googleFont]
  );
  const preStyles = React.useMemo(
    () => ({
      fontFamily: `"${props.googleFont}", monospace`,
      fontSize: props.fontSize,
      margin: 0,
      padding: '0 1em'
    }),
    [props.googleFont, props.fontSize]
  );
  return (
    <>
      <GoogleFont typography={typography} />
      <Highlight
        {...defaultProps}
        code={props.children}
        language={props.language}
        theme={theme}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className} style={{ ...style, ...preStyles }}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </>
  );
}

CodePane.propTypes = {
  children: propTypes.string.isRequired,
  fontSize: propTypes.number,
  googleFont: propTypes.string,
  language: propTypes.string.isRequired,
  theme: propTypes.object
};

CodePane.defaultProps = {
  language: 'javascript',
  theme: theme,
  fontSize: 15,
  googleFont: 'Fira Code'
};
