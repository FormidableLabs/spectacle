import React from "react";
import Base from "./base";
import Radium from "radium";

@Radium
class Overview extends Base {
  constructor(props) {
    super(props);
  }
  _renderSlides() {
    const slide = this.props.slide;
    return this.props.slides.map((child, index) => {
      if (index < slide - 3 || slide + 3 < index) { return false; }
      const left = (50 + 30.6667 * (index - slide)) + "%";
      const style = {
        position: "absolute",
        width: "25%",
        height: "25%",
        top: "50%",
        left,
        transform: " translate(-50%,-50%)",
        border: "1px solid #FFF",
        opacity: index === slide ? 1 : 0.5
      };
      const el = React.cloneElement(child, {
        key: index,
        slideIndex: index,
        transition: [],
        transitionDuration: 0,
        appearOff: true
      });
      return (
        <div style={[style]}>
          {el}
        </div>
      );
    });
  }
  render() {
    const styles = {
      overview: {
        height: "100%",
        width: "100%"
      }
    };
    return (
      <div className="spectacle-overview" style={[styles.overview]}>
        {this._renderSlides()}
      </div>
    );
  }
}

Overview.propTypes = {
  slides: React.PropTypes.array,
  slide: React.PropTypes.number
};

Overview.contextTypes = {
  styles: React.PropTypes.object
};

export default Overview;
