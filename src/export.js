import React, { cloneElement, Component, PropTypes } from "react";
import Radium from "radium";

@Radium
class Export extends Component {
  constructor(props) {
    super(props);
  }
  _renderSlides() {
    return this.props.slides.map((child, index) => {
      return cloneElement(child, {
        key: index,
        slideIndex: index,
        transition: [],
        transitionDuration: 0
      });
    });
  }
  render() {
    const styles = {
      export: {
        height: "100%",
        width: "100%"
      }
    };
    return (
      <div className="spectacle-export" style={[styles.export]}>
        {this._renderSlides()}
      </div>
    );
  }
}

Export.propTypes = {
  slides: PropTypes.array
};

Export.contextTypes = {
  styles: PropTypes.object
};

export default Export;
