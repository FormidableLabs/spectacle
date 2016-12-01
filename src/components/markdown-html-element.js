import React, { PropTypes } from "react";

/**
 * Pure Render Component for inserting inner HTML
 *
 * @export
 * @param {any} props component props
 * @returns {Object} rendered component
 */
export default function MarkdownHTMLElement(props) {
  const { style, content, displayMode, ...rest } = props;

  const markup = { __html: content };
  if (displayMode === false) {
    return <span style={style} {...rest} dangerouslySetInnerHTML={markup} />;
  } else {
    return <div style={style} {...rest} dangerouslySetInnerHTML={markup} />;
  }
}

MarkdownHTMLElement.propTypes = {
  content: PropTypes.string.isRequired,
  displayMode: PropTypes.bool,
  style: PropTypes.object
};
