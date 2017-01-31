import React, { cloneElement, Component, PropTypes } from "react";
import Radium from "radium";
import { getSlideByIndex } from "../utils/slides";

@Radium
export default class Overview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      overviewWidth: document.documentElement.clientWidth
    };
    this.resizeHandler = this.resizeHandler.bind(this);
  }
  componentDidMount() {
    this.resizeHandler();
    window.addEventListener("resize", this.resizeHandler);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeHandler);
  }
  _slideClicked(index) {
    this.context.history.replace(`/${this._getHash(index)}`);
  }
  _getHash(slideIndex) {
    return this.props.slideReference[slideIndex].id;
  }
  _renderSlides() {
    const slideIndex = this.props.slideIndex;
    const screen = this.state.overviewWidth;
    return this.props.slideReference.map((reference, index) => {
      const style = {
        position: "relative",
        width: screen / 3,
        height: (screen / 3) * 0.7,
        float: "left",
        opacity: index === slideIndex ? 1 : 0.5,
        cursor: "pointer",
        ":hover": {
          opacity: 1
        }
      };
      const slide = getSlideByIndex(
        this.props.slides,
        this.props.slideReference,
        index
      );
      const el = cloneElement(slide, {
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
      overviewWidth: this.overviewRef.clientWidth
    });
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
      <div className="spectacle-overview" ref={(o) => { this.overviewRef = o; }} style={[styles.overview]}>
        {this._renderSlides()}
      </div>
    );
  }
}

Overview.propTypes = {
  route: PropTypes.object,
  slideIndex: PropTypes.number,
  slideReference: PropTypes.array,
  slides: PropTypes.array
};

Overview.contextTypes = {
  styles: PropTypes.object,
  history: PropTypes.object
};
