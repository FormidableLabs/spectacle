import React from 'react';
import Slide from './slide';
import Markdown from './markdown';

var transformStringsIntoJSX = function transformStringsIntoJSX(strings) {
  return strings.split(/\n---\n/).map(function (markdown, index) {
    return React.createElement(Slide, {
      key: "md-slide-".concat(index)
    }, React.createElement(Markdown, null, markdown));
  });
};

export default function MarkdownSlides(stringOrStrings) {
  for (var _len = arguments.length, interpolations = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    interpolations[_key - 1] = arguments[_key];
  }

  if (Array.isArray(stringOrStrings)) {
    var strings = stringOrStrings.map(function (string, index) {
      if (interpolations[index]) {
        return (string + interpolations[index]).trim();
      }

      return string.trim();
    }).join('');
    return transformStringsIntoJSX(strings);
  }

  return transformStringsIntoJSX(stringOrStrings);
}