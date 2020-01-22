/**
 * Custom template overrides.
 */
import { createElement } from 'react';
import { FlexBox, Text } from 'spectacle';
import logo from './formidable.png';

const template = ({ numberOfSlides, slideNumber }) =>
  createElement(
    FlexBox,
    {
      justifyContent: 'space-between',
      position: 'absolute',
      bottom: 0,
      width: 1
    },
    createElement('img', {
      src: logo,
      style: {
        width: 108,
        height: 60,
        padding: 40
      }
    }),
    createElement(
      Text,
      {
        fontSize: 16,
        color: 'quinary',
        fontWeight: 'bold'
      },
      'Slide ',
      slideNumber + 1,
      ' of ',
      numberOfSlides
    )
  );

export default template;
