import React from 'react';
import PropTypes from 'prop-types';
export default function TableBody(_ref) {
  var children = _ref.children;
  return React.createElement("tbody", null, children);
}
TableBody.propTypes = {
  children: PropTypes.node
};
TableBody.contextTypes = {
  styles: PropTypes.object,
  store: PropTypes.object
};