import React, { PropTypes } from "react";

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
