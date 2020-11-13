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

const checkIfSingleArrayInHighlightRanges = highlightRanges => {
  if (highlightRanges.length === 0 || highlightRanges.length > 2) {
    return false;
  }
  // Prevents e.g. [3, [5]] from being considered a single array range
  return highlightRanges.every(range => typeof range === 'number');
};

const getRangeFormat = ({ isSingleRangeProvided, highlightRanges, step }) => {
  // If the value passed to highlightRanges is:
  // a single array containing only two numbers e.g. [3, 5]
  if (isSingleRangeProvided) {
    return highlightRanges;

    // a 2D array and some of its elements contain numbers e.g. [[1, 3], 5, 7, 9, [10, 15]]
  } else if (
    !isSingleRangeProvided &&
    typeof highlightRanges[step] === 'number'
  ) {
    return [highlightRanges[step]];

    // a 2D array e.g. [[1], [3], [5, 9], [15], [20, 25], [30]]
  } else {
    return highlightRanges[step];
  }
};

const getStyleForLineNumber = (lineNumber, activeRange) => {
  const isOneLineNumber = activeRange.length === 1;
  if (isOneLineNumber) {
    const [activeLineNumber] = activeRange;
    if (activeLineNumber === lineNumber) {
      return { opacity: 1 };
    } else {
      return { opacity: 0.5 };
    }
  }

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
  const isSingleRangeProvided = React.useMemo(() => {
    return checkIfSingleArrayInHighlightRanges(highlightRanges);
  }, [highlightRanges]);

  const numberOfSteps = React.useMemo(() => {
    return isSingleRangeProvided ? 1 : highlightRanges.length;
  }, [isSingleRangeProvided, highlightRanges]);

  const theme = React.useContext(ThemeContext);
  const { stepId, isActive, step, placeholder } = useSteps(numberOfSteps, {
    stepIndex
  });

  const children = React.useMemo(() => {
    return indentNormalizer(rawCodeString);
  }, [rawCodeString]);

  const scrollTarget = React.useRef();

  const getLineNumberProps = React.useCallback(
    lineNumber => {
      if (!isActive) return;
      const range = getRangeFormat({
        isSingleRangeProvided,
        highlightRanges,
        step
      });
      return {
        style: getStyleForLineNumber(lineNumber, range)
      };
    },
    [isActive, highlightRanges, step, isSingleRangeProvided]
  );

  const getLineProps = React.useCallback(
    lineNumber => {
      if (!isActive) return;
      const range = getRangeFormat({
        isSingleRangeProvided,
        highlightRanges,
        step
      });
      return {
        ref: lineNumber === range[0] ? scrollTarget : undefined,
        style: getStyleForLineNumber(lineNumber, range)
      };
    },
    [isActive, highlightRanges, step, isSingleRangeProvided]
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
  highlightRanges: propTypes.arrayOf(
    propTypes.oneOfType([propTypes.number, propTypes.arrayOf(propTypes.number)])
  ),
  language: propTypes.string.isRequired,
  children: propTypes.string.isRequired,
  stepIndex: propTypes.number,
  theme: propTypes.oneOf([propTypes.object, ...availableCodePaneThemes])
};

CodePane.defaultProps = {
  theme: 'atomDark'
};
