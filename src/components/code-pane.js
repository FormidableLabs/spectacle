import * as React from 'react';
import propTypes from 'prop-types';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { useSteps } from '../hooks/use-steps';
import indentNormalizer from '../utils/indent-normalizer';
import { ThemeContext } from 'styled-components';
import * as styles from 'react-syntax-highlighter/dist/esm/styles/prism';

export const availableCodePaneThemes = [
  'atomDark',
  'base16AteliersulphurpoolLight',
  'cb',
  'coy',
  'darcula',
  'dark',
  'duotoneDark',
  'duotoneEarth',
  'duotoneForest',
  'duotoneLight',
  'duotoneSea',
  'duotoneSpace',
  'funky',
  'ghcolors',
  'hopscotch',
  'okaidia',
  'pojoaque',
  'prism',
  'solarizedlight',
  'tomorrow',
  'twilight',
  'vs',
  'xonokai'
];

const getStyleForLineNumber = (lineNumber, activeRange) => {
  const [from, to] = activeRange;
  if (from <= lineNumber && lineNumber <= to) {
    return { opacity: 1 };
  } else {
    return { opacity: 0.5 };
  }
};

export default function CodePane({
  highlightRanges = [],
  language,
  children: rawCodeString,
  stepIndex,
  theme: syntaxTheme
}) {
  const theme = React.useContext(ThemeContext);
  const { stepId, isActive, step, placeholder } = useSteps(
    highlightRanges.length,
    {
      stepIndex
    }
  );

  const children = React.useMemo(() => {
    return indentNormalizer(rawCodeString);
  }, [rawCodeString]);

  const scrollTarget = React.useRef();

  const getLineNumberProps = React.useCallback(
    lineNumber => {
      if (!isActive) return;
      return {
        style: getStyleForLineNumber(lineNumber, highlightRanges[step])
      };
    },
    [isActive, highlightRanges, step]
  );

  const getLineProps = React.useCallback(
    lineNumber => {
      if (!isActive) return;
      const range = highlightRanges[step];
      return {
        ref: lineNumber === range[0] ? scrollTarget : undefined,
        style: getStyleForLineNumber(lineNumber, range)
      };
    },
    [isActive, step, highlightRanges]
  );

  React.useEffect(() => {
    const immHandle = setImmediate(() => {
      if (!scrollTarget.current) return;
      scrollTarget.current.scrollIntoView({
        block: 'center',
        behavior: 'smooth'
      });
    });
    return () => {
      clearImmediate(immHandle);
    };
  }, [isActive, step]);

  const customStyle = React.useMemo(() => {
    /**
     * Provide fallback values if the user intentionally overrides the
     * default theme with no valid values.
     */
    const {
      size: { width = 1366 },
      space = [0, 0, 0],
      fontSizes: { monospace = '20px' }
    } = theme;

    return {
      padding: space[0],
      margin: 0,
      width: width - space[2] * 2 - space[0] * 2,
      fontSize: monospace
    };
  }, [theme]);

  const syntaxStyle = React.useMemo(() => {
    if (typeof syntaxTheme === 'string') {
      return styles[syntaxTheme];
    } else syntaxTheme;
  }, [syntaxTheme]);

  return (
    <>
      {placeholder}
      <SyntaxHighlighter
        customStyle={customStyle}
        language={language}
        wrapLines
        showLineNumbers
        lineProps={getLineProps}
        lineNumberProps={getLineNumberProps}
        style={syntaxStyle}
      >
        {children}
      </SyntaxHighlighter>
    </>
  );
}

CodePane.propTypes = {
  highlightRanges: propTypes.array,
  language: propTypes.string.isRequired,
  children: propTypes.string.isRequired,
  stepIndex: propTypes.number,
  theme: propTypes.oneOf([propTypes.object, ...availableCodePaneThemes])
};

CodePane.defaultProps = {
  theme: 'atomDark'
};
