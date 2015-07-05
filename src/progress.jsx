import React from 'react/addons';
import assign from 'object-assign';
import Base from './base';
import Radium from 'radium';

var animations = {
  pacmanTopFrames: Radium.keyframes({
    '0%': {transform: 'rotateZ(0deg)'},
    '100%': {transform: 'rotateZ(-30deg)'}
  }),
  pacmanBottomFrames: Radium.keyframes({
    '0%': {transform: 'rotateZ(0deg)'},
    '100%': {transform: 'rotateZ(30deg)'}
  }),
  pacmanTopFramesBis: Radium.keyframes({
    '0%': {transform: 'rotateZ(0deg)'},
    '100%': {transform: 'rotateZ(-30deg)'}
  }),
  pacmanBottomFramesBis: Radium.keyframes({
    '0%': {transform: 'rotateZ(0deg)'},
    '100%': {transform: 'rotateZ(30deg)'}
  })
};

@Radium
class Progress extends Base {
  render() {
    let style = this.context.styles.progress;
    return (
      <div style={[this.getStyles()]}>
        <div style={[style.container]}>
          <div style={[style.pacman, this.getPointPosition(this.props.currentSlide)]} >
            <div style={[style.pacmanTop, this.getPacmanStyle('Top')]} />
            <div style={[style.pacmanBottom, this.getPacmanStyle('Bottom')]} />
          </div>
          {this.props.items.map((item, i) => {
            return <div style={[style.point, this.getPointStyle(i)]}
                        key={'presentation-progress-' + i} />;
          })}

        </div>
      </div>
    );
  }

  getPacmanStyle(side) {
    let animationName = 'pacman' + side + 'Frames' + (this.props.currentSlide % 2 ? '' : 'Bis');
    return {
      animation: animations[animationName] + ' 0.12s linear 10 alternate both'
    }
  }

  getPointPosition(i) {
    return {
      top: '-20px',
      left: (5 + 20 * (i - this.props.items.length / 2)) + 'px'
    };
  }

  getPointStyle(i) {
    let style = this.getPointPosition(i);
    if (this.props.currentSlide >= i) {
      style.opacity = 0;
    }

    return style;
  }

}

Progress.contextTypes = {
  styles: React.PropTypes.object
}

export default Progress;
