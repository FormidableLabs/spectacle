import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';

@Radium
export default class Progress extends Component {
  getWidth() {
    return {
      width: `${(100 * this.props.currentSlideIndex / (this.props.items.length - 1))}%`
    };
  }

  getPacmanStyle(side) {
    const animationName = `pacman${side}Frames${(this.props.currentSlideIndex % 2 ? '' : 'Bis')}`;
    return {
      animation: `${animationName} 0.12s linear 10 alternate both`
    };
  }

  getPointPosition(i) {
    return {
      top: '-20px',
      left: `${(5 + 20 * (i - this.props.items.length / 2))}px`
    };
  }

  getPointStyle(i) {
    const style = this.getPointPosition(i);
    if (this.props.currentSlideIndex >= i) {
      style.opacity = 0;
    }

    return style;
  }

  render() {
    const { type, currentSlideIndex, items } = this.props;
    let style = this.context.styles.progress;
    let markup;
    switch (type) {
    case 'none':
      return false;
    case 'pacman':
      style = style.pacman;
      markup = (
          <div>
            <div style={[style.pacman, this.getPointPosition(currentSlideIndex)]} >
              <div style={[style.pacmanTop, this.getPacmanStyle('Top')]} />
              <div style={[style.pacmanBottom, this.getPacmanStyle('Bottom')]} />
            </div>
            {items.map((item, i) => {
              return (
                <div
                  style={[style.point, this.getPointStyle(i)]}
                  key={`presentation-progress-${i}`}
                />
              );
            })}
          </div>
        );
      break;
    case 'number':
      style = style.number;
      markup = (
          <div>{currentSlideIndex + 1} / {items.length}</div>
        );
      break;
    case 'bar':
      style = style.bar;
      markup = (
          <div style={[style.bar, this.getWidth()]} />
        );
      break;
    default:
      return false;
    }
    return (
      <div style={[style.container]}>
        {markup}
      </div>
    );
  }
}

Progress.propTypes = {
  currentSlideIndex: PropTypes.number,
  items: PropTypes.array,
  type: PropTypes.oneOf(['pacman', 'bar', 'number', 'none'])
};

Progress.contextTypes = {
  styles: PropTypes.object
};
