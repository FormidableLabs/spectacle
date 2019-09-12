import React from 'react';
import PropTypes from 'prop-types';
import useSlide, { SlideContext } from '../hooks/use-slide';
import styled, { ThemeContext } from 'styled-components';
import { color } from 'styled-system';

const SlideContainer = styled('div')`
  ${color};
  position: relative;
  transform-origin: left center;
  width: ${({ theme }) => theme.size.width || 1366}px;
  height: ${({ theme }) => theme.size.height || 768}px;
`;
const SlideWrapper = styled('div')`
  ${color};
  overflow-y: scroll;
`;
const TemplateWrapper = styled('div')`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
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
    numberOfSlides,
    scaleRatio
  } = props;
  const theme = React.useContext(ThemeContext);
  const [ratio, setRatio] = React.useState(scaleRatio || 1);

  const transformForWindowSize = React.useCallback(() => {
    const slideWidth = theme.size.width || 1366;
    const clientWidth = Math.max(
      document.documentElement.clientWidth,
      window.innerWidth || 0
    );
    const newRatio = clientWidth / slideWidth;
    setRatio(newRatio);
  }, [theme]);

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

  return (
    <SlideContainer
      backgroundColor={backgroundColor}
      style={{ transform: `scale(${ratio})` }}
    >
      <TemplateWrapper>
        {typeof template === 'function' &&
          template({
            slideNumber: slideNum,
            numberOfSlides: numberOfSlides - 1
          })}
      </TemplateWrapper>
      <SlideWrapper color={textColor}>
        <SlideContext.Provider value={value}>{children}</SlideContext.Provider>
      </SlideWrapper>
    </SlideContainer>
  );
};

Slide.propTypes = {
  backgroundColor: PropTypes.string,
  children: PropTypes.node.isRequired,
  numberOfSlides: PropTypes.number,
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
