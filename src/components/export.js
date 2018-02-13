import React, { cloneElement, Component } from 'react';
import PropTypes from 'prop-types';
import { getSlideByIndex, getNotesForSlide } from '../utils/slides';
import styled from 'react-emotion';
import {
  BlogContainer,
  SlideWrapper,
  SlideNotes
} from './blog-components';

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

      const notes = getNotesForSlide(slide);

      const el = cloneElement(slide, {
        key: index,
        slideIndex: index,
        blog: this.props.route.params.indexOf('blog') !== -1,
        export: this.props.route.params.indexOf('export') !== -1,
        print: this.props.route.params.indexOf('print') !== -1,
        notes,
        transition: [],
        transitionIn: [],
        transitionOut: [],
        transitionDuration: 0
      });
      return el;
    }); 
  }

  _renderNotes() {
    const slide = getSlideByIndex(
      this.props.slides,
      this.props.slideReference,
      this.props.slideIndex
    );

    let notes = getNotesForSlide(slide);
    return notes;
  }

  render() {
    let el;
    if (this.props.route.params.indexOf('blog')) {
      return (
        <BlogContainer>
          <SlideWrapper>
            {this._renderSlides()}
          </SlideWrapper>
          <SlideNotes>
            {this._renderNotes()}
          </SlideNotes>
        </BlogContainer>
      );
    } else {
      return (
        <StyledExport>
          {this._renderSlides()}
        </StyledExport>
      );
    }
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
