import React, { PropTypes } from "react";
import { findDOMNode } from "react-dom";
import tweenState from "react-tween-state";
import _ from "lodash";
import { connect } from "react-redux";

const Appear = React.createClass({
  mixins: [tweenState.Mixin],
  propTypes: {
    children: PropTypes.node,
    style: PropTypes.object,
    route: PropTypes.object
  },
  contextTypes: {
    export: PropTypes.bool,
    overview: PropTypes.bool,
    slide: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  },
  getInitialState() {
    return {
      active: false,
      opacity: this.props.route.params.indexOf("export") !== -1 || this.props.route.params.indexOf("overview") !== -1 ? 1 : 0
    };
  },
  componentWillReceiveProps(nextProps) {
    const state = nextProps.fragment;
    const slide = this.props.route.slide;
    const fragment = findDOMNode(this.refs.fragment);
    const key = _.findKey(state.fragments[slide], {
      "id": parseInt(fragment.dataset.fid)
    });
    if (slide in state.fragments && state.fragments[slide].hasOwnProperty(key)) {
      this.setState({
        active: state.fragments[slide][key].visible
      }, () => {
        let endVal = this.state.active ? 1 : 0;
        if (this.props.route.params.indexOf("export") !== -1 || this.props.route.params.indexOf("overview") !== -1) {
          endVal = 1;
        }
        this.tweenState("opacity", {
          easing: tweenState.easingTypes.easeInOutQuad,
          duration: 300,
          endValue: endVal
        });
      });
    }
  },
  render() {
    const styles = {
      opacity: this.getTweeningValue("opacity")
    };
    const child = React.Children.only(this.props.children);
    return React.cloneElement(
      child,
      {
        style: Object.assign({}, this.props.style, styles),
        className: "fragment",
        ref: "fragment"
      }
    );
  }
});

export default connect((state) => state)(Appear);
