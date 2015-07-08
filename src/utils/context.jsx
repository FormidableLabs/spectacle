import React from "react/addons";

const context = function context(Component, params) {
  const wrapper = React.createClass({
    displayName: "ContextWrapper",
    propTypes: {
      location: React.PropTypes.object,
      params: React.PropTypes.object
    },
    childContextTypes: {
      styles: React.PropTypes.object,
      flux: React.PropTypes.object,
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
      return {
        styles,
        flux: params.flux,
        presenter: location.query && "presenter" in location.query,
        overview: location.query && "overview" in location.query,
        export: location.query && "export" in location.query,
        print: location.query && "print" in location.query,
        slide: this.props.params && "slide" in this.props.params ?
          parseInt(this.props.params.slide) : 0
      };
    },

    render: function render() {
      return <Component {...this.props} />;
    }
  });
  return wrapper;
};

export default context;
