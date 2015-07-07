import React from "react/addons";

const context = function context(Component, params) {
  const wrapper = React.createClass({
    displayName: "ContextWrapper",
    propTypes: {
      location: React.PropTypes.object
    },
    childContextTypes: {
      styles: React.PropTypes.object,
      flux: React.PropTypes.object,
      presenter: React.PropTypes.bool
    },
    getChildContext() {
      let styles = {};
      if (this.props.location.query && "print" in this.props.location.query) {
        styles = params.print;
      } else {
        styles = params.styles;
      }
      return {
        styles,
        flux: params.flux,
        presenter: this.props.location.query &&
          "presenter" in this.props.location.query
      };
    },

    render: function render() {
      return <Component {...this.props} />;
    }
  });
  return wrapper;
};

export default context;
