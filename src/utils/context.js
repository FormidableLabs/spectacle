import React, { PropTypes } from "react";

const context = (Component, params) => {
  const wrapper = React.createClass({
    displayName: "ContextWrapper",
    propTypes: {
      location: PropTypes.object,
      history: PropTypes.object,
      params: PropTypes.object,
      store: PropTypes.object
    },
    childContextTypes: {
      styles: PropTypes.object,
      presenter: PropTypes.bool,
      overview: PropTypes.bool,
      export: PropTypes.bool,
      print: PropTypes.bool,
      slide: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      history: PropTypes.object,
      location: PropTypes.object
    },
    getChildContext() {
      const { location, history } = this.props;
      let styles = {};
      if (location.query && "print" in location.query) {
        styles = params.print;
      } else {
        styles = params.styles;
      }
      let slide = 0;
      if (this.props.params && "slide" in this.props.params) {
        slide = this.props.params.slide;
      }
      return {
        styles,
        history,
        location,
        presenter: location.query && "presenter" in location.query,
        overview: location.query && "overview" in location.query,
        export: location.query && "export" in location.query,
        print: location.query && "print" in location.query,
        slide
      };
    },

    render() {
      return <Component {...this.props} />;
    }
  });
  return wrapper;
};

export default context;
