import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';

@Radium
export default class Controls extends Component {
  render() {
    return (
      <div>
        {this.props.currentSlideIndex !== 0 &&
          <button
            type="button"
            key="prev"
            onClick={this.props.onPrev}
            style={this.context.styles.controls.prev}
          >
            <svg
              key="prevIcon"
              style={this.context.styles.controls.prevIcon}
              width="32px"
              height="32px"
              viewBox="0 0 512 828.586"
            >
              <path d="M512,97.707L414.293,0L0,414.293l414.293,414.293L512,730.88L195.414,414.293L512,97.707z"/>
            </svg>
          </button>}
        {this.props.currentSlideIndex < (this.props.totalSlides - 1) &&
          <button
            type="button"
            key="next"
            onClick={this.props.onNext}
            style={this.context.styles.controls.next}
          >
            <svg
              key="nextIcon"
              style={this.context.styles.controls.nextIcon}
              width="32px"
              height="32px"
              viewBox="0 0 512 828.586"
            >
              <path d="M97.707,0L0,97.707l316.586,316.586L0,730.88l97.707,97.706L512,414.293L97.707,0z"/>
            </svg>
          </button>}
      </div>
    );
  }
}

Controls.propTypes = {
  currentSlideIndex: PropTypes.number,
  onNext: PropTypes.func,
  onPrev: PropTypes.func,
  totalSlides: PropTypes.number
};

Controls.contextTypes = {
  styles: PropTypes.object
};
