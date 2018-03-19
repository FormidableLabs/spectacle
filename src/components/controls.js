import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Controls extends Component {
  constructor() {
    super(...arguments);
    this.resolveFillStyle = this.resolveFillStyle.bind(this);
  }

  resolveFillStyle(name) {
    let color;
    const { controlColor } = this.props;
    if (controlColor) {
      if (!this.context.styles.colors.hasOwnProperty(controlColor)) {
        color = controlColor;
      } else {
        color = this.context.styles.colors[controlColor];
      }
      return {
        fill: color
      };
    }
    return this.context.styles.controls[name];
  }

  render() {
    return (
      <div>
        {this.props.currentSlideIndex !== 0 &&
          <button
            type="button"
            key="prev"
            aria-label="Previous slide"
            onClick={this.props.onPrev}
            style={this.context.styles.controls.prev}
          >
            <svg
              key="prevIcon"
              style={this.resolveFillStyle('prevIcon')}
              width="32px"
              height="32px"
              viewBox="0 0 512 828.586"
              role="presentation"
              focusable="false"
            >
              <path d="M512,97.707L414.293,0L0,414.293l414.293,414.293L512,730.88L195.414,414.293L512,97.707z"/>
            </svg>
          </button>}
        {this.props.currentSlideIndex < (this.props.totalSlides - 1) &&
          <button
            type="button"
            key="next"
            aria-label="Next slide"
            onClick={this.props.onNext}
            style={this.context.styles.controls.next}
          >
            <svg
              key="nextIcon"
              style={this.resolveFillStyle('nextIcon')}
              width="32px"
              height="32px"
              viewBox="0 0 512 828.586"
              role="presentation"
              focusable="false"
            >
              <path d="M97.707,0L0,97.707l316.586,316.586L0,730.88l97.707,97.706L512,414.293L97.707,0z"/>
            </svg>
          </button>}
      </div>
    );
  }
}

Controls.propTypes = {
  controlColor: PropTypes.string,
  currentSlideIndex: PropTypes.number,
  onNext: PropTypes.func,
  onPrev: PropTypes.func,
  totalSlides: PropTypes.number
};

Controls.contextTypes = {
  styles: PropTypes.object
};
