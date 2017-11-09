import React, { cloneElement, Component } from 'react';
import PropTypes from 'prop-types';
import { getSlideByIndex } from '../utils/slides';
import styled from 'react-emotion';

const StyledExport = styled.div`
  height: 100%;
  width: 100%;
`;

export default class Export extends Component {
  _renderSlides() {
    return this.props.slideReference.map((reference, index) => {
      const slide = getSlideByIndex(
        this.props.slides,
        this.props.slideReference,
        index
      );
      return cloneElement(slide, {
        key: index,
        slideIndex: index,
        export: this.props.route.params.indexOf('export') !== -1,
        print: this.props.route.params.indexOf('print') !== -1,
        transition: [],
        transitionIn: [],
        transitionOut: [],
        transitionDuration: 0
      });
    });
  }
  render() {
    return (
      <StyledExport>
        {this._renderSlides()}
      </StyledExport>
    );
  }
}

Export.propTypes = {
  route: PropTypes.object,
  slideReference: PropTypes.array,
  slides: PropTypes.array
};

Export.contextTypes = {
  styles: PropTypes.object
};
