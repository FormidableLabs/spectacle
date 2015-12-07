import React, { cloneElement, Component, PropTypes } from "react";
import Radium from "radium";

@Radium
export default class Overview extends Component {
  _slideClicked(index) {
    this.context.history.replaceState(null, `/${this._getHash(index)}`);
  }
  _getHash(slide) {
    let hash = slide;
    if ("id" in this.props.slides[slide].props) {
      hash = this.props.slides[slide].props.id;
    }
    return hash;
  }
  _renderSlides() {
    const slide = this.props.slide;
    return this.props.slides.map((child, index) => {
      const style = {
        position: "relative",
        width: window.innerWidth / 3,
        height: window.innerHeight / 3,
        float: "left",
        transform: "scale(0.8)",
        border: "2px solid white",
        opacity: index === slide ? 1 : 0.5,
        cursor: "pointer",
        ":hover": {
          opacity: 1
        }
      };
      const el = cloneElement(child, {
        key: index,
        slideIndex: index,
        route: this.props.route,
        transition: [],
        transitionDuration: 0,
        appearOff: true
      });
      return (
        <div key={index} style={[style]} onClick={this._slideClicked.bind(this, index)}>
          {el}
        </div>
      );
    });
  }
  componentDidMount() {
    window.onresize = () => {
      this.forceUpdate()
    };
  }
  render() {
    const styles = {
      overview: {
        height: "100%",
        width: "100%",
        overflow: "scroll"
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
  route: PropTypes.object,
  slides: PropTypes.array,
  slide: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

Overview.contextTypes = {
  styles: PropTypes.object,
  history: PropTypes.object
};
