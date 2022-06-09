import Slide, { SlideProps } from './slide/slide';
import { Box, FlexBox } from './layout-primitives';
import { ComponentProps, Fragment, ReactNode } from 'react';
import { Heading, ListItem, OrderedList, UnorderedList } from './typography';
import { Appear } from './appear';

const Full = ({ children, ...rest }: SlideProps) => (
  <Slide {...rest}>{children}</Slide>
);

const Center = ({ children, ...rest }: SlideProps) => (
  <Slide {...rest}>
    <FlexBox justifyContent="center" alignItems="center" height="100%">
      <Box>{children}</Box>
    </FlexBox>
  </Slide>
);

const TwoColumn = ({
  left,
  right,
  ...rest
}: Omit<SlideProps, 'children'> & { left: ReactNode; right: ReactNode }) => (
  <Slide {...rest}>
    <FlexBox flexDirection="row" alignItems="start" flex={1}>
      <Box width="100%">{left}</Box>
      <Box width="100%">{right}</Box>
    </FlexBox>
  </Slide>
);

const List = ({
  title,
  items,
  listType = 'unordered',
  appearIn = false,
  titleProps,
  ...rest
}: Omit<SlideProps, 'children'> & {
  title?: string;
  listType?: 'unordered' | 'ordered';
  items: ReactNode[];
  appearIn?: boolean;
  titleProps?: ComponentProps<typeof Heading>;
}) => {
  const List = listType === 'unordered' ? UnorderedList : OrderedList;

  return (
    <Slide {...rest}>
      {title ? (
        <Heading textAlign="left" {...titleProps}>
          {title}
        </Heading>
      ) : null}
      <List>
        {items.map((item, i) => {
          const Wrapper = appearIn ? Appear : Fragment;

          return (
            <Wrapper key={i}>
              <ListItem key={i}>{item}</ListItem>
            </Wrapper>
          );
        })}
      </List>
    </Slide>
  );
};

/**
 * TODO:
 * - Image (left, right, full bleed?)
 * - Intro
 * - Quote
 * - Section
 * - Statement?
 * - Big fact?
 */

export default { Full, Center, TwoColumn, List };
