import React, { Component, PropTypes } from "react";
import Radium from "radium";
import { styleBase, propTypesBase } from "../utils/base";

@Radium
export default class Cite extends Component {
  render() {
    return (
      <cite style={[this.context.styles.components.cite, styleBase(this.props, this.context), this.props.style]}>
        - {this.props.children}
      </cite>
    );
  }
}

Cite.propTypes = Object.assign({}, propTypesBase, {
  style: PropTypes.object,
  children: PropTypes.node
});

Cite.contextTypes = {
  styles: PropTypes.object
};
