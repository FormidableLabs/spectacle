import React, { cloneElement, Children, Component, PropTypes } from "react";
import { findDOMNode } from "react-dom";
import Radium from "radium";
import scrollIntoView from "dom-scroll-into-view";

const slidesPerWidth = 3;

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
    this._ensureActiveItemVisible();
  }
  componentDidUpdate(prevProps) {
    if (this.props.slideIndex !== prevProps.slideIndex) {
      this._ensureActiveItemVisible();
    }
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
  _renderSlideColumns() {
    const screen = this.state.overviewWidth;
    let startIndex = 0;
    let nextStartIndex = 0;
    return this.props.slides.map((slide, rootIndex) => {
      startIndex = nextStartIndex;
      const columnSlides = slide.props.hasSlideChildren ?
        Children.toArray(slide.props.children) :
        [ slide ];
      nextStartIndex += columnSlides.length;
      const style = {
        display: "flex",
        flexDirection: "column",
        flexWrap: "nowrap",
        width: screen / slidesPerWidth,
        height: (screen / slidesPerWidth) * 0.7 * columnSlides.length
      };
      return (
        <div key={`col${rootIndex}`} style={[style]}>
          {this._renderSlides(columnSlides, startIndex)}
        </div>
      );
    });
  }
  _renderSlides(columnSlides, startIndex) {
    const slideIndex = this.props.slideIndex;
    const screen = this.state.overviewWidth;
    return columnSlides.map((slide, colSlideIndex) => {
      const index = startIndex + colSlideIndex;
      const style = {
        display: "flex",
        flexDirection: "column",
        flexWrap: "nowrap",
        width: screen / slidesPerWidth,
        height: (screen / slidesPerWidth) * 0.7,
        position: "relative",
        opacity: index === slideIndex ? 1 : 0.5,
        cursor: "pointer",
        ":hover": {
          opacity: 1
        }
      };
      const el = cloneElement(slide, {
        key: index,
        slideIndex: index,
        export: this.props.route.params.indexOf("export") !== -1,
        print: this.props.route.params.indexOf("print") !== -1,
        overview: true,
        transition: [],
        transitionDuration: 0,
        appearOff: true
      });
      return (
        <div
          ref={index === slideIndex ? (d) => { this.activeSlideRef = d; } : null}
          key={index}
          style={[style]}
          onClick={this._slideClicked.bind(this, index)}
        >
          {el}
        </div>
      );
    });
  }
  _ensureActiveItemVisible() {
    if (this.activeSlideRef) {
      scrollIntoView(
        findDOMNode(this.activeSlideRef),
        findDOMNode(this.overviewRef),
        { onlyScrollIfNeeded: true, alignWithLeft: false, alightWithTop: false }
      );
    }
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
        display: "flex",
        flexDirection: "row",
        flexWrap: "nowrap",
        overflow: "scroll"
      }
    };
    return (
      <div className="spectacle-overview" ref={(o) => { this.overviewRef = o; }} style={[styles.overview]}>
        {this._renderSlideColumns()}
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
