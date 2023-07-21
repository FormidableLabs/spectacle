import { MarkdownComponentMap } from '../../utils/mdx-component-mapper';
import { ElementType } from 'react';

export type MdComponentProps = { [key: string]: any };

export type CommonMarkdownProps = {
  animateListItems?: boolean;
  componentProps?: MdComponentProps;
  children: string;
};

export type MarkdownSlideProps = CommonMarkdownProps &
  MapAndTemplate & { slideConfig?: Record<string, string> };

export type MarkdownSlideSetProps = CommonMarkdownProps & {
  slideProps?: Partial<MarkdownSlideProps>[];
};

export type MapAndTemplate = {
  componentMap?: MarkdownComponentMap;
  template?: {
    default: ElementType;
    getPropsForAST?: Function;
  };
};
