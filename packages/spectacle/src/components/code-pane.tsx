import {
  forwardRef,
  useMemo,
  useContext,
  useRef,
  useCallback,
  useEffect,
  CSSProperties
} from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { useSteps } from '../hooks/use-steps';
import indentNormalizer from '../utils/indent-normalizer';
import styled, { ThemeContext } from 'styled-components';
import { compose, layout, position } from 'styled-system';
import dark from 'react-syntax-highlighter/dist/cjs/styles/prism/vs-dark';

type Ranges = Array<number | number[]>;

const checkForNumberValues = (ranges: Ranges) => {
  return ranges.every((element) => typeof element === 'number');
};

const checkForInvalidValues = (ranges: Ranges) => {
  return ranges.every((element) => element === null || element === undefined);
};

const getRangeFormat = (
  numberOfSteps: number,
  highlightRanges: Ranges,
  step: number
): Ranges => {
  // If the value passed to highlightRanges is:
  // a single array containing only two numbers e.g. [3, 5]
  if (numberOfSteps === 1) {
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
  return highlightRanges[step] as Ranges;
};

const getStyleForLineNumber = (lineNumber: number, activeRange: Ranges) => {
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

const Container = styled('div')(compose(position, layout));

const CodePane = forwardRef<HTMLDivElement, CodePaneProps>(
  (
    {
      highlightRanges = [],
      language,
      showLineNumbers = true,
      children: rawCodeString,
      stepIndex,
      theme: syntaxTheme = dark,
      ...props
    },
    ref
  ) => {
    const numberOfSteps = useMemo(() => {
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

    const theme = useContext(ThemeContext);
    const { isActive, step, placeholder } = useSteps(numberOfSteps, {
      stepIndex
    });

    const children = useMemo(() => {
      return indentNormalizer(rawCodeString);
    }, [rawCodeString]);

    const scrollTarget = useRef<HTMLElement>(null);

    const getLineNumberStyle = useCallback(
      (lineNumber: number) => {
        if (!isActive) return {};
        const range = getRangeFormat(numberOfSteps, highlightRanges, step);
        return getStyleForLineNumber(lineNumber, range);
      },
      [isActive, highlightRanges, numberOfSteps, step]
    );

    const getLineProps = useCallback(
      (lineNumber: number) => {
        if (!isActive) return {};
        const range = getRangeFormat(numberOfSteps, highlightRanges, step);
        return {
          ref: lineNumber === (range as number[])[0] ? scrollTarget : null,
          style: getStyleForLineNumber(lineNumber, range)
        };
      },
      [isActive, highlightRanges, numberOfSteps, step]
    );

    useEffect(() => {
      window.requestAnimationFrame(() => {
        if (!scrollTarget.current) return;
        scrollTarget.current.scrollIntoView({
          block: 'center',
          behavior: 'smooth'
        });
      });
    }, [isActive, step]);

    const customStyle = useMemo(() => {
      /**
       * Provide fallback values if the user intentionally overrides the
       * default theme with no valid values.
       */
      const {
        space = [0, 0, 0],
        fontSizes: { monospace = '20px' }
      } = theme;

      return {
        padding: space[0],
        margin: 0,
        fontSize: monospace
      };
    }, [theme]);

    return (
      <>
        {placeholder}
        <Container ref={ref} {...props}>
          <SyntaxHighlighter
            customStyle={customStyle}
            language={language}
            wrapLines
            showLineNumbers={showLineNumbers}
            showInlineLineNumbers
            lineProps={getLineProps}
            lineNumberStyle={getLineNumberStyle}
            style={syntaxTheme}
          >
            {children}
          </SyntaxHighlighter>
        </Container>
      </>
    );
  }
);
CodePane.displayName = 'CodePane';

export type CodePaneProps = {
  children: string;
  language: string | undefined;
  theme?: Record<string, CSSProperties>;
  stepIndex?: number;
  highlightRanges?: Ranges;
  showLineNumbers?: boolean;
};

export default CodePane;
