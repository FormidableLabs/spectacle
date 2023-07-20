import Slide from '../slide/slide';
import React, { PropsWithChildren } from 'react';
import { Markdown } from './markdown';
import { MarkdownSlideProps } from './markdown-types';
import { FlexBox } from '../layout-primitives';

const Columns = ({ children }: PropsWithChildren) => (
  <FlexBox flexDirection="row" alignItems="start" flex={1}>
    {children}
  </FlexBox>
);

const hasLayoutConfig =
  (layoutKey: string) => (config?: Record<string, string>) =>
    config && 'layout' in config && config.layout === layoutKey;

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
