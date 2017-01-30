import React, { Component, PropTypes } from "react";

class SlideSet extends Component {
  render() {
    return <div>{this.props.children}</div>;
  }
}

SlideSet.defaultProps = {
  hasSlideChildren: true,
  slides: []
};

SlideSet.propTypes = {
  children: PropTypes.array,
  hasSlideChildren: PropTypes.bool,
  slides: PropTypes.array
};

SlideSet.contextTypes = {
  store: PropTypes.object
};

export default SlideSet;
