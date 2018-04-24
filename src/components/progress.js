import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'react-emotion';

const Pacman = {
  Base: styled.div(({ styles, position }) => [ styles, position ]),
  Body: styled.div(props => props.styles)
};

// NOTE: rotateZ is 0.1 to generate two different animation names (emotion deduplication)
const pacmanTopFrames = keyframes`
  0% { transform: rotateZ(0.1deg) }
  100% { transform: rotateZ(-30deg) }
`;

// NOTE: rotateZ is 0.1 to generate two different animation names (emotion deduplication)
const pacmanBottomFrames = keyframes`
  0% { transform: rotateZ(0.1deg) }
  100% { transform: rotateZ(30deg) }
`;

const pacmanTopFramesBis = keyframes`
  0% { transform: rotateZ(0deg) }
  100% { transform: rotateZ(-30deg) }
`;

const pacmanBottomFramesBis = keyframes`
  0% { transform: rotateZ(0deg) }
  100% { transform: rotateZ(30deg) }
`;

const Point = styled.div(({ styles, position }) => [ styles, position ]);
const Bar = styled.div(({ styles, width }) => [ styles, width ]);
const Container = styled.div(props => props.styles);

export default class Progress extends Component {
  constructor() {
    super(...arguments);
    this.resolveProgressStyles = this.resolveProgressStyles.bind(this);
  }

  resolveProgressStyles(field) {
    const { progressColor } = this.props;

    if (!this.props.progressColor) {
      return null;
    }

    const style = {};
    let color;

    if (!this.context.styles.colors.hasOwnProperty(progressColor)) {
      color = progressColor;
    } else {
      color = this.context.styles.colors[progressColor];
    }

    style[field] = color;

    return style;
  }

  getWidth() {
    return {
      width: `${(100 * this.props.currentSlideIndex / (this.props.items.length - 1))}%`
    };
  }

  getPacmanStyle(side) {
    const isBis = this.props.currentSlideIndex % 2 !== 0;
    let animationName;

    if (side === 'top') {
      animationName = isBis ? pacmanTopFramesBis : pacmanTopFrames;
    } else {
      animationName = isBis ? pacmanBottomFramesBis : pacmanBottomFrames;
    }

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
            <Pacman.Base
              styles={style.pacman}
              position={this.getPointPosition(currentSlideIndex)}
            >
              <Pacman.Body styles={[style.pacmanTop, this.getPacmanStyle('top'), this.resolveProgressStyles('background')]} />
              <Pacman.Body styles={[style.pacmanBottom, this.getPacmanStyle('bottom'), this.resolveProgressStyles('background')]} />
            </Pacman.Base>
            {items.map((item, i) => {
              return (
                <Point
                  styles={[style.point, this.resolveProgressStyles('borderColor')]}
                  position={this.getPointStyle(i)}
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
          <Bar styles={[style.bar, this.resolveProgressStyles('background')]} width={this.getWidth()} />
        );
      break;
    default:
      return false;
    }
    return (
      <Container styles={[style.container, this.resolveProgressStyles('color')]}>
        {markup}
      </Container>
    );
  }
}

Progress.propTypes = {
  currentSlideIndex: PropTypes.number,
  items: PropTypes.array,
  progressColor: PropTypes.string,
  type: PropTypes.oneOf(['pacman', 'bar', 'number', 'none'])
};

Progress.contextTypes = {
  styles: PropTypes.object
};
