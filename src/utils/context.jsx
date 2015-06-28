import React from 'react/addons';

function context(Component, params) {
  var context = React.createClass({
    displayName: 'ContextWrapper',

    childContextTypes: {
      styles: React.PropTypes.object
    },

    getChildContext: function() {
      return params;
    },

    render: function render() {
      return <Component {...this.props} />;
    }
  });
  return context;
}

export default context;