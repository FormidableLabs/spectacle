import * as React from 'react';
import propTypes from 'prop-types';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { useSteps } from '../hooks/use-steps';
import indentNormalizer from '../utils/indent-normalizer';

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
  stepIndex
}) {
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

  return (
    <>
      {placeholder}
      <SyntaxHighlighter
        customStyle={{
          margin: 0
        }}
        language={language}
        wrapLines
        showLineNumbers
        lineProps={getLineProps}
        lineNumberProps={getLineNumberProps}
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
  stepIndex: propTypes.number
};
