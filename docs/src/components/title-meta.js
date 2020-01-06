import React from 'react';
import PropTypes from 'prop-types';
import DocumentMeta from 'react-document-meta';

class TitleMeta extends React.Component {
  render() {
    const titleMeta = {
      title: this.props.title,
      meta: {
        property: {
          'og:title': this.props.title
        }
      }
    };

    return <div {...titleMeta}>{this.props.children}</div>;
  }
}

TitleMeta.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string
};

export default TitleMeta;

export const renderAsHTML = function() {
  return DocumentMeta.renderAsHTML();
};
