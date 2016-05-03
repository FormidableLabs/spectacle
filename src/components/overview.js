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
    const screen = this.refs.overview ? this.refs.overview.clientWidth : 1;
    return this.props.slides.map((child, index) => {
      const style = {
        position: "relative",
        width: screen / 3,
        height: (screen / 3) * 0.7,
        float: "left",
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
    this.forceUpdate();
    window.onresize = () => {
      this.forceUpdate();
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
      <div className="spectacle-overview" ref="overview" style={[styles.overview]}>
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
