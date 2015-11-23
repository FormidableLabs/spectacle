import React, { PropTypes } from "react";
import tweenState from "react-tween-state";
import Base from "./base";
import Transitions from "./transitions";
import config from "../presentation/config";
import radium from "radium";

const Slide = React.createClass({
  displayName: "Slide",
  mixins: [tweenState.Mixin, Base.Mixin, Transitions],
  getDefaultProps() {
    return {
      align: "center center",
      presenterStyle: {}
    };
  },
  propTypes: {
    align: PropTypes.string,
    hash: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    presenterStyle: PropTypes.object,
    children: PropTypes.node,
    notes: PropTypes.string,
    slideIndex: PropTypes.number,
    lastSlide: PropTypes.number
  },
  contextTypes: {
    styles: PropTypes.object,
    export: PropTypes.bool,
    print: PropTypes.bool,
    overview: PropTypes.bool,
    flux: PropTypes.object
  },
  getInitialState() {
    return {
      zoom: 1,
      contentScale: 1
    };
  },
  setZoom() {
    const mobile = window.matchMedia("(max-width: 628px)").matches;
    const content = this.refs.content;
    const zoom = (content.offsetWidth / config.width);
    const contentScaleY = (content.parentNode.offsetHeight / config.height);
    const contentScaleX = (content.parentNode.offsetWidth / config.width);
    const contentScale = mobile ? 1 : Math.min(contentScaleY, contentScaleX);
    this.setState({
      zoom: zoom > 0.6 ? zoom : 0.6,
      contentScale: contentScale < 1 ? contentScale : 1
    });
  },
  componentDidMount() {
    this.setZoom();
    const slide = this.refs.slide;
    const frags = slide.querySelectorAll(".fragment");
    if (frags && frags.length) {
      Array.prototype.slice.call(frags, 0).forEach((frag, i) => {
        frag.dataset.fid = i;
        this.context.flux.actions.SlideActions.addFragment({
          slide: this.props.hash,
          id: i,
          visible: this.props.lastSlide > this.props.slideIndex
        });
      });
    }
    window.addEventListener("load", this.setZoom);
    window.addEventListener("resize", this.setZoom);
  },
  componentWillUnmount() {
    window.removeEventListener("resize", this.setZoom);
  },
  render() {
    const { align, presenterStyle, children } = this.props;
    const printStyles = this.context.print ? {
      backgroundColor: "white",
      backgroundImage: "none"
    } : {};
    const overViewStyles = {
      inner: {
        flexDirection: "column"
      },
      content: {
        width: "100%"
      }
    };
    const styles = {
      outer: {
        position: this.context.export ? "relative" : "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        overflow: "hidden",
        backgroundColor: this.context.styles.global.body.background ?
          this.context.styles.global.body.background : ""
      },
      inner: {
        display: "flex",
        position: "relative",
        flex: 1,
        alignItems: align ? align.split(" ")[1] : "center",
        justifyContent: align ? align.split(" ")[0] : "center"
      },
      content: {
        flex: 1,
        maxHeight: config.height,
        maxWidth: config.width,
        fontSize: 16 * this.state.zoom,
        transform: `scale(${this.state.contentScale})`,
        padding: this.state.zoom > 0.6 ? config.margin : 10
      }
    };
    return (
      <div className="spectacle-slide"
        ref="slide"
        style={[
          styles.outer,
          this.getStyles(),
          this.getTransitionStyles(),
          printStyles,
          presenterStyle
        ]}
      >
        <div style={[styles.inner, this.context.overview && overViewStyles.inner]}>
          <div ref="content"
            className="spectacle-content"
            style={[
              styles.content,
              this.context.styles.components.content,
              this.context.overview && overViewStyles.content
            ]}
          >
            {children}
          </div>
        </div>
      </div>
    );
  }
});

export default radium(Slide);
