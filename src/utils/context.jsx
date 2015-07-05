import React from 'react/addons';

function context(Component, params) {
  var context = React.createClass({
    displayName: 'ContextWrapper',

    childContextTypes: {
      styles: React.PropTypes.object,
      flux: React.PropTypes.object,
      presenter: React.PropTypes.bool
    },

    getChildContext() {
      let styles = {};
      if (this.props.location.query && 'print' in this.props.location.query) {
        styles = params.print;
      } else {
        styles = params.styles;
      }
      return {
        styles: styles,
        flux: params.flux,
        presenter: this.props.location.query &&
          'presenter' in this.props.location.query
      };
    },

    render: function render() {
      return <Component {...this.props} />;
    }
  });
  return context;
}

export default context;