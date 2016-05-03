import React, { Component, PropTypes } from "react";
import Radium, { Style } from "radium";

@Radium
export default class Progress extends Component {
  render() {
    const { type, currentSlide, items } = this.props;
    let style = this.context.styles.progress;
    let markup;
    switch (type) {
      case "none":
        return false;
      case "pacman":
        style = style.pacman;
        markup = (
          <div>
            <div style={[style.pacman, this.getPointPosition(currentSlide)]} >
              <div style={[style.pacmanTop, this.getPacmanStyle("Top")]} />
              <div style={[style.pacmanBottom, this.getPacmanStyle("Bottom")]} />
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
      case "number":
        style = style.number;
        markup = (
          <div>{currentSlide + 1} / {items.length}</div>
        );
        break;
      case "bar":
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

  getWidth() {
    return {
      width: `${(100 * this.props.currentSlide / (this.props.items.length - 1))}%`
    };
  }

  getPacmanStyle(side) {
    const animationName = `pacman${side}Frames${(this.props.currentSlide % 2 ? "" : "Bis")}`;
    return {
      animation: `${animationName} 0.12s linear 10 alternate both`
    };
  }

  getPointPosition(i) {
    return {
      top: "-20px",
      left: `${(5 + 20 * (i - this.props.items.length / 2))}px`
    };
  }

  getPointStyle(i) {
    const style = this.getPointPosition(i);
    if (this.props.currentSlide >= i) {
      style.opacity = 0;
    }

    return style;
  }

}

Progress.propTypes = {
  items: PropTypes.array,
  currentSlide: PropTypes.number,
  type: PropTypes.oneOf(["pacman", "bar", "number", "none"])
};

Progress.contextTypes = {
  styles: PropTypes.object
};
