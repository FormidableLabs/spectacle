import React, { Children, cloneElement, Component } from 'react';
import PropTypes from 'prop-types';
import { getSlideByIndex } from '../utils/slides';
import {
  HeaderContainer,
  EndHeader,
  PresenterContent,
  SlideInfo,
  ContentContainer,
  PreviewPane,
  PreviewCurrentSlide,
  PreviewNextSlide,
  Notes,
} from './presenter-components';

import Time from './time';

export default class Presenter extends Component {
  static childContextTypes = {
    updateNotes: PropTypes.func,
  };

  state = {
    notes: {},
  };

  getChildContext() {
    return {
      updateNotes: this.updateNotes.bind(this),
    };
  }

  getCurrentSlide() {
    return this.context.store.getState().route.slide;
  }

  updateNotes(newNotes, slide = null) {
    const notes = { ...this.state.notes };
    notes[slide || this.getCurrentSlide()] = newNotes;

    this.setState({ notes });
  }

  _getSlideByIndex(index) {
    return getSlideByIndex(
      Children.toArray(this.props.slides),
      this.props.slideReference,
      index
    );
  }
  _renderMainSlide() {
    const { slideIndex, hash, lastSlideIndex } = this.props;
    const child = this._getSlideByIndex(slideIndex);
    const presenterStyle = {
      position: 'relative',
    };
    return cloneElement(child, {
      dispatch: this.props.dispatch,
      key: slideIndex,
      hash,
      export: this.props.route.params.indexOf('export') !== -1,
      print: this.props.route.params.indexOf('print') !== -1,
      slideIndex,
      lastSlideIndex,
      transition: [],
      transitionIn: [],
      transitionOut: [],
      transitionDuration: 0,
      presenter: true,
      presenterStyle,
    });
  }
  _renderNextSlide() {
    const { slideIndex, lastSlideIndex } = this.props;
    const presenterStyle = {
      position: 'relative',
    };
    const child = this._getSlideByIndex(slideIndex + 1);
    return child ? (
      cloneElement(child, {
        dispatch: this.props.dispatch,
        export: this.props.route.params.indexOf('export') !== -1,
        print: this.props.route.params.indexOf('print') !== -1,
        key: slideIndex + 1,
        hash: child.props.id || slideIndex + 1,
        slideIndex: slideIndex + 1,
        lastSlideIndex,
        transition: [],
        transitionIn: [],
        transitionOut: [],
        transitionDuration: 0,
        presenterStyle,
        presenter: true,
        appearOff: true,
      })
    ) : (
      <EndHeader>END</EndHeader>
    );
  }
  _renderNotes() {
    let notes;
    const currentSlide = this.getCurrentSlide();

    if (this.state.notes[currentSlide]) {
      notes = this.state.notes[currentSlide];
    } else {
      const child = this._getSlideByIndex(this.props.slideIndex);
      notes = child.props.notes;
    }

    if (!notes) {
      return false;
    }

    if (typeof notes === 'string') {
      return <div dangerouslySetInnerHTML={{ __html: notes }} />;
    }
    return <div>{notes}</div>;
  }
  render() {
    return (
      <PresenterContent>
        <HeaderContainer>
          <SlideInfo>
            Slide {this.props.slideIndex + 1} of{' '}
            {this.props.slideReference.length}
          </SlideInfo>
          <Time timer={this.props.timer} />
        </HeaderContainer>
        <ContentContainer>
          <PreviewPane>
            <PreviewCurrentSlide className="spectacle-presenter-main">
              {this._renderMainSlide()}
            </PreviewCurrentSlide>
            <PreviewNextSlide>{this._renderNextSlide()}</PreviewNextSlide>
          </PreviewPane>
          <Notes>{this._renderNotes()}</Notes>
        </ContentContainer>
      </PresenterContent>
    );
  }
}

Presenter.propTypes = {
  dispatch: PropTypes.func,
  hash: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  lastSlideIndex: PropTypes.number,
  route: PropTypes.object,
  slideIndex: PropTypes.number,
  slideReference: PropTypes.array,
  slides: PropTypes.array,
  timer: PropTypes.bool,
};

Presenter.contextTypes = {
  styles: PropTypes.object,
  store: PropTypes.object.isRequired,
};
