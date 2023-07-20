import Slide from '../slide/slide';
import React from 'react';
import { Markdown } from './markdown';
import { MarkdownSlideProps } from './markdown-types';

// const availableLayoutTypes = ['center'] as const;

export const MarkdownSlide = ({
  children,
  componentMap,
  template,
  animateListItems = false,
  componentProps = {},
  ...rest
}: MarkdownSlideProps) => {
  return (
    <Slide {...rest}>
      <Markdown
        {...{
          componentMap,
          template,
          animateListItems,
          componentProps,
          children
        }}
      />
    </Slide>
  );
};
