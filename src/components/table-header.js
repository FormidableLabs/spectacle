import React, { PropTypes } from "react";

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
