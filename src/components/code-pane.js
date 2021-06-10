import * as React from 'react';
import propTypes from 'prop-types';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { useSteps } from '../hooks/use-steps';
import indentNormalizer from '../utils/indent-normalizer';
import { ThemeContext } from 'styled-components';
import dark from 'react-syntax-highlighter/dist/cjs/styles/prism/vs-dark';

const checkForNumberValues = ranges => {
  return ranges.every(element => typeof element === 'number');
};

const checkForInvalidValues = ranges => {
  return ranges.every(element => element === null || element === undefined);
};

const getRangeFormat = ({ isSingleRangeProvided, highlightRanges, step }) => {
  // If the value passed to highlightRanges is:
  // a single array containing only two numbers e.g. [3, 5]
  if (isSingleRangeProvided) {
    return highlightRanges;
  }

  // a 2D array containing null/undefined values e.g. [1, null, 5, [7, 9]]
  if (highlightRanges[step] === null || highlightRanges[step] === undefined) {
    return [];
  }

  // a 2D array and some of its elements contain numbers e.g. [[1, 3], 5, 7, 9, [10, 15]]
  if (typeof highlightRanges[step] === 'number') {
    return [highlightRanges[step]];
  }

  // a 2D array e.g. [[1], [3], [5, 9], [15], [20, 25], [30]]
  return highlightRanges[step];
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
  return { opacity: from <= lineNumber && lineNumber <= to ? 1 : 0.5 };
};

export default function CodePane({
  highlightRanges = [],
  language,
  showLineNumbers = true,
  children: rawCodeString,
  stepIndex,
  theme: syntaxTheme = dark
}) {
  const numberOfSteps = React.useMemo(() => {
    if (
      highlightRanges.length === 0 ||
      // Prevents e.g. [null, null] to be used to count the number of steps
      checkForInvalidValues(highlightRanges)
    ) {
      return 0;
    }

    // Checks if the value passed to highlightRanges is a single array containing only two numbers e.g. [3, 5]
    const isSingleRange =
      highlightRanges.length <= 2 &&
      // Prevents e.g. [3, [5]] from being considered a single array range
      checkForNumberValues(highlightRanges);

    if (isSingleRange) {
      return 1;
    }

    return highlightRanges.length;
  }, [highlightRanges]);

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
        isSingleRangeProvided: numberOfSteps === 1,
        highlightRanges,
        step
      });
      return {
        style: getStyleForLineNumber(lineNumber, range)
      };
    },
    [isActive, highlightRanges, numberOfSteps, step]
  );

  const getLineProps = React.useCallback(
    lineNumber => {
      if (!isActive) return;
      const range = getRangeFormat({
        isSingleRangeProvided: numberOfSteps === 1,
        highlightRanges,
        step
      });
      return {
        ref: lineNumber === range[0] ? scrollTarget : undefined,
        style: getStyleForLineNumber(lineNumber, range)
      };
    },
    [isActive, highlightRanges, numberOfSteps, step]
  );

  React.useEffect(() => {
    window.requestAnimationFrame(() => {
      if (!scrollTarget.current) return;
      scrollTarget.current?.scrollIntoView({
        block: 'center',
        behavior: 'smooth'
      });
    });
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

  return (
    <>
      {placeholder}
      <SyntaxHighlighter
        customStyle={customStyle}
        language={language}
        wrapLines
        showLineNumbers={showLineNumbers}
        lineProps={getLineProps}
        lineNumberProps={getLineNumberProps}
        style={syntaxTheme}
      >
        {children}
      </SyntaxHighlighter>
    </>
  );
}

CodePane.propTypes = {
  highlightRanges: propTypes.arrayOf(
    propTypes.oneOfType([
      propTypes.number.isRequired,
      propTypes.arrayOf(propTypes.number.isRequired)
    ])
  ),
  showLineNumbers: propTypes.bool,
  language: propTypes.string.isRequired,
  children: propTypes.string.isRequired,
  stepIndex: propTypes.number,
  theme: propTypes.object
};
