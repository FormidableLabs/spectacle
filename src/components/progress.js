import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';

const Pacman = {
  Base: styled.div(({ styles, position }) => [ styles, position ]),
  Body: styled.div(props => props.styles)
};

const Point = styled.div(({ styles, position }) => [ styles, position ]);
const Bar = styled.div(({ styles, width }) => [ styles, width ]);
const Container = styled.div(props => props.styles);

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
            <Pacman.Base
              styles={style.pacman}
              position={this.getPointPosition(currentSlideIndex)}
            >
              <Pacman.Body styles={[style.pacmanTop, this.getPacmanStyle('Top')]} />
              <Pacman.Body styles={[style.pacmanBottom, this.getPacmanStyle('Bottom')]} />
            </Pacman.Base>
            {items.map((item, i) => {
              return (
                <Point
                  styles={style.point}
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
          <Bar styles={style.bar} width={this.getWidth()} />
        );
      break;
    default:
      return false;
    }
    return (
      <Container styles={style.container}>
        {markup}
      </Container>
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
