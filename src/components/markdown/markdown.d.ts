import * as React from 'react';

type MdComponentProps = { [key: string]: any };

export const Markdown: React.FC<{
  animateListItems?: boolean;
  children: React.ReactNode;
  componentProps?: MdComponentProps;
}>;

export const MarkdownSlide: React.FC<{
  animateListItems?: boolean;
  children: React.ReactNode;
  componentProps?: MdComponentProps;
}>;

export const MarkdownSlideSet: React.FC<{
  animateListItems?: boolean;
  children: React.ReactNode;
  componentProps?: MdComponentProps;
}>;

export const MarkdownPreHelper: (
  PreComponent: React.ComponentType,
  CodeInlineComponent: React.ComponentType,
  CodeBlockComponent: React.ComponentType
) => React.FC<{
  animateListItems?: boolean;
  children: React.ReactNode;
  componentProps?: MdComponentProps;
}>;
