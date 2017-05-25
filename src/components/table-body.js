import React from 'react';
import PropTypes from 'prop-types';

export default function TableBody({ children }) {
  return <tbody>{ children }</tbody>;
}

TableBody.propTypes = {
  children: PropTypes.node
};

TableBody.contextTypes = {
  styles: PropTypes.object,
  store: PropTypes.object
};
