import React, { cloneElement, Component, PropTypes } from "react";
import Radium from "radium";

@Radium
export default class Overview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      overviewWidth: document.documentElement.clientWidth
    };
    this.resizeHandler = this.resizeHandler.bind(this);
  }
  _slideClicked(index) {
    this.context.history.replace(`/${this._getHash(index)}`);
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
    const screen = this.state.overviewWidth;
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
        export: this.props.route.params.indexOf("export") !== -1,
        print: this.props.route.params.indexOf("print") !== -1,
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
  resizeHandler() {
    this.setState({
      overviewWidth: this.refs.overview.clientWidth
    });
  }
  componentDidMount() {
    this.resizeHandler();
    window.addEventListener("resize", this.resizeHandler);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeHandler);
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
