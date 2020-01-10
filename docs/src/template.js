import React from 'react';
import PropTypes from 'prop-types';
import { GlobalStyle } from './global-style';

class Template extends React.Component {
  render() {
    return (
      <div>
        <GlobalStyle />
        <main>{this.props.children}</main>
      </div>
    );
  }
}

Template.propTypes = {
  children: PropTypes.node
};

Template.defaultProps = {
  children: null
};

export default Template;
