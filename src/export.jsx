import React from "react/addons";
import cloneWithProps from "react/lib/cloneWithProps";
import Radium from "radium";

@Radium
class Export extends React.Component {
  constructor(props) {
    super(props);
  }
  _renderSlides() {
    return this.props.slides.map((child, index) => {
      return cloneWithProps(child, {
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
  slides: React.PropTypes.array
};

Export.contextTypes = {
  styles: React.PropTypes.object
};

export default Export;
