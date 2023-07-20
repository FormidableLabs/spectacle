import Slide from '../slide/slide';
import React from 'react';
import { Markdown } from './markdown';
import { MarkdownSlideProps } from './markdown-types';
import { Center, Columns, hasLayoutConfig } from './markdown-layout-containers';

export const MarkdownSlide = ({
  children,
  componentMap,
  animateListItems = false,
  componentProps = {},
  slideConfig,
  template: propTemplate,
  ...rest
}: MarkdownSlideProps) => {
  let template = propTemplate;

  if (hasLayoutConfig('columns')(slideConfig)) template = { default: Columns };
  if (hasLayoutConfig('center')(slideConfig)) template = { default: Center };

  return (
    <Slide {...rest}>
      <Markdown
        {...{
          componentMap,
          template,
          animateListItems,
          componentProps,
          children,
          slideConfig
        }}
      />
    </Slide>
  );
};
