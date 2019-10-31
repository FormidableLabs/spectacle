import React from 'react';
import PropTypes from 'prop-types';
import useSlide, { SlideContext } from '../hooks/use-slide';
import styled, { ThemeContext } from 'styled-components';
import { color, space } from 'styled-system';
import useAutofillHeight from '../hooks/use-autofill-height';

const SlideContainer = styled('div')`
  ${color};
  width: ${({ theme }) => theme.size.width || 1366}px;
  height: ${({ theme }) => theme.size.height || 768}px;
  overflow: hidden;
  @media print {
    page-break-before: always;
    height: 100vh;
    width: 100vw;
  }
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
  const slideWrapperRef = React.useRef(null);
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

  useAutofillHeight({ slideWrapperRef, templateRef, contentRef, slideHeight });

  return (
    <SlideContainer
      ref={slideRef}
      backgroundColor={
        window.location.search.includes('print') ? '#ffffff' : backgroundColor
      }
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
      <SlideWrapper
        ref={slideWrapperRef}
        padding="slidePadding"
        color={textColor}
      >
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
