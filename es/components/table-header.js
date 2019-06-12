import React from 'react';
import PropTypes from 'prop-types';
export default function TableHeader(_ref) {
  var children = _ref.children;
  return React.createElement("thead", null, children);
}
TableHeader.propTypes = {
  children: PropTypes.node
};
TableHeader.contextTypes = {
  styles: PropTypes.object,
  store: PropTypes.object
};