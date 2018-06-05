import React, { cloneElement, Component } from 'react';
import PropTypes from 'prop-types';
import { getSlideByIndex } from '../utils/slides';
import styled from 'react-emotion';

const OverviewContainer = styled.div`
  height: 100%;
  overflow: scroll;
  width: 100%;
`;

const SlideThumbnail = styled.div`
  cursor: pointer;
  position: relative;
  float: left;
  height: ${({ screen }) => screen / 3 * 0.7}px;
  opacity: ${({ index, slideIndex }) => (index === slideIndex ? 1 : 0.5)};
  transition: opacity 333ms ease-in-out;
  width: ${({ screen }) => screen / 3}px;

  &:hover {
    opacity: 1;
  }
`;

export default class Overview extends Component {
  constructor() {
    super(...arguments);
    this.resizeHandler = this.resizeHandler.bind(this);
    this.state = {
      overviewWidth: document.documentElement.clientWidth
    };
  }
  componentDidMount() {
    this.resizeHandler();
    window.addEventListener('resize', this.resizeHandler);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeHandler);
  }
  _slideClicked(index) {
    this.context.history.replace(`/${this._getHash(index)}`);
  }
  _getHash(slideIndex) {
    return this.props.slideReference[slideIndex].id;
  }
  _renderSlides() {
    const slideIndex = this.props.slideIndex;
    const screen = this.state.overviewWidth;
    return this.props.slideReference.map((reference, index) => {
      const slide = getSlideByIndex(
        this.props.slides,
        this.props.slideReference,
        index
      );
      const el = cloneElement(slide, {
        key: index,
        slideIndex: index,
        export: this.props.route.params.indexOf('export') !== -1,
        print: this.props.route.params.indexOf('print') !== -1,
        transition: [],
        transitionDuration: 0,
        appearOff: true
      });
      return (
        <SlideThumbnail
          index={index}
          screen={screen}
          slideIndex={slideIndex}
          key={index}
          onClick={this._slideClicked.bind(this, index)}
        >
          {el}
        </SlideThumbnail>
      );
    });
  }
  resizeHandler() {
    this.setState({
      overviewWidth: document.documentElement.clientWidth
    });
  }
  render() {
    return <OverviewContainer>{this._renderSlides()}</OverviewContainer>;
  }
}

Overview.propTypes = {
  route: PropTypes.object,
  slideIndex: PropTypes.number,
  slideReference: PropTypes.array,
  slides: PropTypes.array
};

Overview.contextTypes = {
  styles: PropTypes.object,
  history: PropTypes.object
};
