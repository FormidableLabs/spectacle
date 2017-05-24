import React from 'react';
import PropTypes from 'prop-types';

export default function TableHeader({ children }) {
  return <thead>{ children }</thead>;
}

TableHeader.propTypes = {
  children: PropTypes.node
};

TableHeader.contextTypes = {
  styles: PropTypes.object,
  store: PropTypes.object
};
