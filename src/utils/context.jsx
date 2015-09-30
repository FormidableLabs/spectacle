import React from "react";

const context = function context(Component, params) {
  const wrapper = React.createClass({
    displayName: "ContextWrapper",
    propTypes: {
      location: React.PropTypes.object,
      params: React.PropTypes.object,
      history: React.PropTypes.object
    },
    childContextTypes: {
      styles: React.PropTypes.object,
      flux: React.PropTypes.object,
      history: React.PropTypes.object,
      location: React.PropTypes.object,
      presenter: React.PropTypes.bool,
      overview: React.PropTypes.bool,
      export: React.PropTypes.bool,
      print: React.PropTypes.bool,
      slide: React.PropTypes.number
    },
    getChildContext() {
      let styles = {};
      const location = this.props.location;
      if (location.query && "print" in location.query) {
        styles = params.print;
      } else {
        styles = params.styles;
      }
      let slide = 0;
      if (this.props.params && "slide" in this.props.params) {
        slide = parseInt(this.props.params.slide);
      }
      return {
        styles,
        flux: params.flux,
        history: this.props.history,
        location,
        presenter: location.query && "presenter" in location.query,
        overview: location.query && "overview" in location.query,
        export: location.query && "export" in location.query,
        print: location.query && "print" in location.query,
        slide
      };
    },

    render: function render() {
      return <Component {...this.props} />;
    }
  });
  return wrapper;
};

export default context;
