import React from 'react';
import Slide from './slide';
import Markdown from './markdown';

const transformStringsIntoJSX = function (strings) {
  return strings
    .split(/\n---\n/)
    .map((markdown, index) => (
      <Slide key={`md-slide-${index}`}>
        <Markdown>{ markdown }</Markdown>
      </Slide>
    ));
};

export default function MarkdownSlides(stringOrStrings, ...interpolations) {
  if (Array.isArray(stringOrStrings)) {
    const strings = stringOrStrings
      .map((string, index) => {
        if (interpolations[index]) {
          return (string + interpolations[index]).trim();
        }
        return string.trim();
      })
      .join('');
    return transformStringsIntoJSX(strings);
  }
  return transformStringsIntoJSX(stringOrStrings);
}
