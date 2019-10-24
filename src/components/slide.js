import React from 'react';
import PropTypes from 'prop-types';
import useSlide, { SlideContext } from '../hooks/use-slide';
import styled, { ThemeContext } from 'styled-components';
import { color, space } from 'styled-system';

const SlideContainer = styled('div')`
  ${color};
  width: ${({ theme }) => theme.size.width || 1366}px;
  height: ${({ theme }) => theme.size.height || 768}px;
  overflow: hidden;
`;
const SlideWrapper = styled('div')`
  ${color};
  ${space};
`;
const TemplateWrapper = styled('div')`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: -1;
`;

const getNodeFullHeight = node => {
  const style = getComputedStyle(node);
  return (
    node.offsetHeight +
    parseFloat(style.marginTop) +
    parseFloat(style.marginBottom)
  );
};

/**
 * Slide component wraps anything going in a slide and maintains
 * the slides' internal state through useSlide.
 */

const Slide = props => {
  const {
    children,
    slideNum,
    backgroundColor,
    textColor,
    template,
    scaleRatio
  } = props;
  const theme = React.useContext(ThemeContext);
  const [ratio, setRatio] = React.useState(scaleRatio || 1);
  const [origin, setOrigin] = React.useState({ x: 0, y: 0 });
  const slideRef = React.useRef(null);
  const contentRef = React.useRef(null);
  const templateRef = React.useRef(null);
  const slideWidth = theme.size.width || 1366;
  const slideHeight = theme.size.height || 768;

  const transformForWindowSize = React.useCallback(() => {
    const clientWidth = slideRef.current.parentElement.clientWidth;
    const clientHeight = slideRef.current.parentElement.clientHeight;
    const useVerticalRatio =
      clientWidth / clientHeight > slideWidth / slideHeight;
    const newRatio = useVerticalRatio
      ? clientHeight / slideHeight
      : clientWidth / slideWidth;
    setRatio(newRatio);
  }, [slideHeight, slideWidth]);

  React.useEffect(() => {
    const clientWidth = slideRef.current.parentElement.clientWidth;
    const clientHeight = slideRef.current.parentElement.clientHeight;
    const useVerticalRatio =
      clientWidth / clientHeight > slideWidth / slideHeight;
    const clientRects = slideRef.current.getClientRects();
    setOrigin({
      x: useVerticalRatio
        ? `${(clientWidth - clientRects[0].width) / 2 / (1 - ratio)}px`
        : 'left',
      y: useVerticalRatio
        ? 'top'
        : `${(clientHeight - clientRects[0].height) / 2 / (1 - ratio)}px`
    });
  }, [ratio, slideHeight, slideWidth, theme]);

  React.useEffect(() => {
    if (!isNaN(scaleRatio)) {
      return;
    }
    transformForWindowSize();
    window.addEventListener('resize', transformForWindowSize);
    return () => {
      window.removeEventListener('resize', transformForWindowSize);
    };
  }, [transformForWindowSize, scaleRatio]);

  const value = useSlide(slideNum);
  const { numberOfSlides } = value.state;

  React.useLayoutEffect(() => {
    if (!contentRef.current.hasChildNodes()) {
      return;
    }
    const childNodes = [].slice.call(contentRef.current.childNodes);
    const metrics = childNodes.reduce(
      (memo, current) => {
        const currentNodeIsAutoFill = current.classList.contains(
          'spectacle-auto-height-fill'
        );
        const nodeHeight = getNodeFullHeight(current);
        return {
          totalHeight: nodeHeight + memo.totalHeight,
          autoFillsHeight: currentNodeIsAutoFill
            ? nodeHeight + memo.autoFillsHeight
            : memo.autoFillsHeight,
          numberAutoFills: currentNodeIsAutoFill
            ? memo.numberAutoFills + 1
            : memo.numberAutoFills
        };
      },
      { totalHeight: 0, autoFillsHeight: 0, numberAutoFills: 0 }
    );

    if (templateRef.current.hasChildNodes()) {
      const templateChildNodes = [].slice.call(templateRef.current.childNodes);
      metrics.templateHeight = templateChildNodes.reduce((memo, current) => {
        const nodeHeight = getNodeFullHeight(current);
        console.log(nodeHeight);
        return (memo += nodeHeight);
      }, 0);
    } else {
      metrics.templateHeight = 0;
    }

    console.log(metrics);

    const emptySpace = 0;

    console.log(emptySpace);

    childNodes.forEach(node => {
      const currentNodeIsAutoFill = node.classList.contains(
        'spectacle-auto-height-fill'
      );

      if (!currentNodeIsAutoFill) {
        return;
      }

      node.style.maxHeight = `${emptySpace}px`;
    });
  }, [contentRef, templateRef, slideHeight]);

  return (
    <SlideContainer
      ref={slideRef}
      backgroundColor={backgroundColor}
      style={{
        transform: `scale(${ratio})`,
        transformOrigin: `${origin.x} ${origin.y}`
      }}
    >
      <TemplateWrapper ref={templateRef}>
        {typeof template === 'function' &&
          template({
            slideNumber: slideNum,
            numberOfSlides: numberOfSlides
          })}
      </TemplateWrapper>
      <SlideWrapper padding="slidePadding" color={textColor}>
        <SlideContext.Provider value={value}>
          <div ref={contentRef}>{children}</div>
        </SlideContext.Provider>
      </SlideWrapper>
    </SlideContainer>
  );
};

Slide.propTypes = {
  backgroundColor: PropTypes.string,
  children: PropTypes.node.isRequired,
  scaleRatio: PropTypes.number,
  slideNum: PropTypes.number,
  template: PropTypes.func,
  textColor: PropTypes.string
};

Slide.defaultProps = {
  textColor: 'primary',
  backgroundColor: 'tertiary'
};

export default Slide;
