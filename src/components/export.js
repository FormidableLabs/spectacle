import React, { cloneElement, Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import { getSlideByIndex, getNotesForSlide } from '../utils/slides';
import { WithNotesSlide, NotesWrapper } from './notes-components';

const StandardExport = styled.div`
  height: 100%;
  width: 100%;
`;

const StyledExport = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export default class Export extends Component {
  _renderSlides() {
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
        transitionIn: [],
        transitionOut: [],
        transitionDuration: 0
      });

      return el;
    });
  }

  _renderWithNotes() {
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
        export: this.props.route.params.indexOf('export') !== -1,
        print: this.props.route.params.indexOf('print') !== -1,
        notes,
        transition: [],
        transitionIn: [],
        transitionOut: [],
        transitionDuration: 0
      });

      return (
        <StyledExport key={index}>
          <WithNotesSlide>{el}</WithNotesSlide>
          <NotesWrapper>{notes}</NotesWrapper>
        </StyledExport>
      );
    });
  }

  render() {
    if (this.props.route.params.indexOf('notes') !== -1) {
      return <StandardExport>{this._renderWithNotes()}</StandardExport>;
    } else {
      return <StandardExport>{this._renderSlides()}</StandardExport>;
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
