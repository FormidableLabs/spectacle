import React from "react/addons";
import Base from "./base";
import Radium from "radium";

const animations = {
  pacmanTopFrames: Radium.keyframes({
    "0%": {transform: "rotateZ(0deg)"},
    "100%": {transform: "rotateZ(-30deg)"}
  }),
  pacmanBottomFrames: Radium.keyframes({
    "0%": {transform: "rotateZ(0deg)"},
    "100%": {transform: "rotateZ(30deg)"}
  }),
  pacmanTopFramesBis: Radium.keyframes({
    "0%": {transform: "rotateZ(0deg)"},
    "100%": {transform: "rotateZ(-30deg)"}
  }),
  pacmanBottomFramesBis: Radium.keyframes({
    "0%": {transform: "rotateZ(0deg)"},
    "100%": {transform: "rotateZ(30deg)"}
  })
};

@Radium
class Progress extends Base {
  render() {
    let style = this.context.styles.progress;
    let markup;
    switch (this.props.type) {
      case "none":
        return false;
      case "pacman":
        style = style.pacman;
        markup = (
          <div>
            <div style={[style.pacman, this.getPointPosition(this.props.currentSlide)]} >
              <div style={[style.pacmanTop, this.getPacmanStyle("Top")]} />
              <div style={[style.pacmanBottom, this.getPacmanStyle("Bottom")]} />
            </div>
            {this.props.items.map((item, i) => {
              return (<div style={[style.point, this.getPointStyle(i)]}
                        key={"presentation-progress-" + i} />);
            })}
          </div>
        );
        break;
      case "number":
        style = style.number;
        markup = (
          <div>{this.props.currentSlide + 1} / {this.props.items.length}</div>
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
      <div style={[this.getStyles()]}>
        <div style={[style.container]}>
          {markup}
        </div>
      </div>
    );
  }

  getWidth() {
    return {
      width: (100 * this.props.currentSlide / (this.props.items.length - 1)) + "%"
    };
  }

  getPacmanStyle(side) {
    const animationName = "pacman" + side + "Frames" + (this.props.currentSlide % 2 ? "" : "Bis");
    return {
      animation: animations[animationName] + " 0.12s linear 10 alternate both"
    };
  }

  getPointPosition(i) {
    return {
      top: "-20px",
      left: (5 + 20 * (i - this.props.items.length / 2)) + "px"
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
  items: React.PropTypes.array,
  currentSlide: React.PropTypes.number,
  type: React.PropTypes.oneOf(["pacman", "bar", "number", "none"])
};

Progress.contextTypes = {
  styles: React.PropTypes.object
};

export default Progress;
