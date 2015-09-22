/*global window*/

import React from "react/addons";
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
    align: React.PropTypes.string,
    hash: React.PropTypes.number,
    presenterStyle: React.PropTypes.object,
    children: React.PropTypes.node,
    notes: React.PropTypes.string,
    slideIndex: React.PropTypes.number,
    lastSlide: React.PropTypes.number
  },
  contextTypes: {
    styles: React.PropTypes.object,
    export: React.PropTypes.bool,
    print: React.PropTypes.bool,
    overview: React.PropTypes.bool,
    flux: React.PropTypes.object
  },
  getInitialState() {
    return {
      zoom: 1,
      contentScale: 1
    };
  },
  setZoom() {
    const mobile = window.matchMedia("(max-width: 628px)").matches;
    const content = React.findDOMNode(this.refs.content);
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
    const slide = React.findDOMNode(this.refs.slide);
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
        backgroundColor: this.context.styles.global.body.background ?
          this.context.styles.global.body.background : ""
      },
      inner: {
        display: "flex",
        position: "relative",
        flex: 1,
        alignItems: this.props.align ? this.props.align.split(" ")[1] : "center",
        justifyContent: this.props.align ? this.props.align.split(" ")[0] : "center"
      },
      content: {
        flex: 1,
        maxHeight: config.height,
        maxWidth: config.width,
        fontSize: 16 * this.state.zoom,
        transform: "scale(" + this.state.contentScale + ")",
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
          this.props.presenterStyle]}>
        <div style={[styles.inner, this.context.overview && overViewStyles.inner]}>
          <div ref="content"
            className="spectacle-content"
            style={[styles.content, this.context.styles.components.content, this.context.overview && overViewStyles.content]}>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
});

export default radium(Slide);
