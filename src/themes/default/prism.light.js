import { css } from 'react-emotion';

/*
Name: Duotone Light
Author: Simurai, adapted from DuoTone themes for Atom (http://simurai.com/projects/2016/01/01/duotone-themes)
Conversion: Bram de Haan (http://atelierbram.github.io/Base2Tone-prism/output/prism/prism-base2tone-morning-light.css)
Generated with Base16 Builder (https://github.com/base16-builder/base16-builder)

Spectacle NOTE: This syntax theme was modified to work with react-live and emotion
*/

export default css`
  background: #faf8f5;
  color: #728fcb;

  & .token.comment,
  & .token.prolog,
  & .token.doctype,
  & .token.cdata {
    color: #b6ad9a;
  }

  & .token.punctuation {
    color: #b6ad9a;
  }

  & .token.namespace {
    opacity: .7;
  }

  & .token.tag,
  & .token.operator,
  & .token.number {
    color: #063289;
  }

  & .token.property,
  & .token.function {
    color: #b29762;
  }

  & .token.tag-id,
  & .token.selector,
  & .token.atrule-id {
    color: #2d2006;
  }

  & .token.attr-name {
    color: #896724;
  }

  & .token.boolean,
  & .token.string,
  & .token.entity,
  & .token.url,
  & .style .token.string,
  & .token.attr-value,
  & .token.keyword,
  & .token.control,
  & .token.directive,
  & .token.unit,
  & .token.statement,
  & .token.regex,
  & .token.atrule {
    color: #728fcb;
  }

  & .token.placeholder,
  & .token.variable {
    color: #93abdc;
  }

  & .token.deleted {
    text-decoration: line-through;
  }

  & .token.inserted {
    border-bottom: 1px dotted #2d2006;
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
    color: #896724;
  }

  & .token.entity {
    cursor: help;
  }
`;
