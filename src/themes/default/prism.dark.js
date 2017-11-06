import { css } from 'react-emotion';

/*
Name: Duotone Dark
Author: Simurai, adapted from DuoTone themes for Atom (http://simurai.com/projects/2016/01/01/duotone-themes)
Conversion: Bram de Haan (http://atelierbram.github.io/Base2Tone-prism/output/prism/prism-base2tone-evening-dark.css)
Generated with Base16 Builder (https://github.com/base16-builder/base16-builder)

Spectacle NOTE: This syntax theme was modified to work with react-live and emotion
*/

// TODO: @import url('https://fonts.googleapis.com/css?family=Roboto+Mono');

export default css`
  font-family: 'Roboto Mono', monospace;
  font-size: inherit;
  line-height: 1.5;
  direction: ltr;
  text-align: left;
  white-space: pre;
  word-spacing: normal;
  word-break: normal;

  -moz-tab-size: 2;
  -o-tab-size: 2;
  tab-size: 2;

  -webkit-hyphens: none;
  -moz-hyphens: none;
  -ms-hyphens: none;
  hyphens: none;

  background: #2a2734;
  color: #9a86fd;

  /* React Live modifications: */
  white-space: pre-wrap;

  &::-moz-selection, & ::-moz-selection {
    text-shadow: none;
    background: #6a51e6;
  }

  &::selection, & ::selection {
    text-shadow: none;
    background: #6a51e6;
  }

  & .token.comment,
  & .token.prolog,
  & .token.doctype,
  & .token.cdata {
    color: #6c6783;
  }

  & .token.punctuation {
    color: #6c6783;
  }

  & .token.namespace {
    opacity: .7;
  }

  & .token.tag,
  & .token.operator,
  & .token.number {
    color: #e09142;
  }

  & .token.property,
  & .token.function {
    color: #9a86fd;
  }

  & .token.tag-id,
  & .token.selector,
  & .token.atrule-id {
    color: #eeebff;
  }

  & .token.attr-name {
    color: #c4b9fe;
  }

  & .token.boolean,
  & .token.string,
  & .token.entity,
  & .token.url,
  & .language-css .token.string,
  & .language-scss .token.string,
  & .style .token.string,
  & .token.attr-value,
  & .token.keyword,
  & .token.control,
  & .token.directive,
  & .token.unit,
  & .token.statement,
  & .token.regex,
  & .token.atrule {
    color: #ffcc99;
  }

  & .token.placeholder,
  & .token.variable {
    color: #ffcc99;
  }

  & .token.deleted {
    text-decoration: line-through;
  }

  & .token.inserted {
    border-bottom: 1px dotted #eeebff;
    text-decoration: none;
  }

  & .token.italic {
    font-style: italic;
  }

  & .token.important,
  & .token.bold {
    font-weight: bold;
  }

  & .token.important {
    color: #c4b9fe;
  }

  & .token.entity {
    cursor: help;
  }
`;
