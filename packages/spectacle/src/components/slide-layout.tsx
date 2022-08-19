import Slide, { SlideProps } from './slide/slide';
import { Box, FlexBox } from './layout-primitives';
import { ComponentProps, Fragment, ReactNode } from 'react';
import {
  Heading,
  Text,
  ListItem,
  OrderedList,
  UnorderedList
} from './typography';
import { Appear } from './appear';

/**
 * Full-slide layout
 */
const Full = ({ children, ...rest }: SlideProps) => (
  <Slide {...rest}>{children}</Slide>
);

/**
 * Centered layout
 */
const Center = ({ children, ...rest }: SlideProps) => (
  <Slide {...rest}>
    <FlexBox justifyContent="center" alignItems="center" height="100%">
      <Box>{children}</Box>
    </FlexBox>
  </Slide>
);

/**
 * Two-column layout
 */
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

/**
 * List layout with optional title
 */
const List = ({
  title,
  items,
  listType = 'unordered',
  animateListItems = false,
  titleProps,
  listProps,
  ...rest
}: Omit<SlideProps, 'children'> & {
  title?: string;
  listType?: 'unordered' | 'ordered';
  items: ReactNode[];
  animateListItems?: boolean;
  titleProps?: ComponentProps<typeof Heading>;
  listProps?: ComponentProps<typeof UnorderedList & typeof OrderedList>;
}) => {
  const List = listType === 'unordered' ? UnorderedList : OrderedList;

  return (
    <Slide {...rest}>
      {title ? (
        <Heading textAlign="left" {...titleProps}>
          {title}
        </Heading>
      ) : null}
      {/* @ts-ignore TODO: Resolve this in follow-up */}
      <List {...listProps}>
        {items.map((item, i) => {
          const Wrapper = animateListItems ? Appear : Fragment;

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
 * Generic vertically-centered Header layout
 */
const Header = ({
  flexBoxProps,
  headingProps,
  heading,
  ...rest
}: Omit<SlideProps, 'children'> & {
  heading: string | ReactNode;
  flexBoxProps?: ComponentProps<typeof FlexBox>;
  headingProps?: ComponentProps<typeof Heading>;
}) => (
  <Slide {...rest}>
    <FlexBox height="100%" {...flexBoxProps}>
      <Heading {...headingProps}>{heading}</Heading>
    </FlexBox>
  </Slide>
);

/**
 * Section layout with left aligned text
 */
const Section = ({
  sectionTitle,
  sectionTitleProps,
  ...rest
}: Omit<SlideProps, 'children'> & {
  sectionTitle: string | ReactNode;
  sectionTitleProps?: ComponentProps<typeof Heading>;
}) => (
  <Header
    heading={sectionTitle}
    headingProps={sectionTitleProps}
    flexBoxProps={{ justifyContent: 'flex-start' }}
  />
);

/**
 * Statement layout with centered text
 */
const Statement = ({
  statement,
  statementProps,
  ...rest
}: Omit<SlideProps, 'children'> & {
  statement: string | ReactNode;
  statementProps?: ComponentProps<typeof Heading>;
}) => <Header heading={statement} headingProps={statementProps} />;

/**
 * Big Fact with optional fact information
 */
const BigFact = ({
  fact,
  factInformation,
  factProps,
  factFontSize = '250px',
  factInformationProps,
  ...rest
}: Omit<SlideProps, 'children'> & {
  fact: string;
  factInformation?: string;
  factProps?: ComponentProps<typeof Text>;
  factFontSize?: string;
  factInformationProps?: ComponentProps<typeof Text>;
}) => (
  <Slide {...rest}>
    <FlexBox>
      <Box>
        <Text textAlign="center" fontSize={factFontSize} {...factProps}>
          {fact}
        </Text>
        {factInformation ? (
          <Text textAlign="center" {...factInformationProps}>
            {factInformation}
          </Text>
        ) : null}
      </Box>
    </FlexBox>
  </Slide>
);

/**
 * Quote layout
 */
const Quote = ({
  quote,
  quoteProps,
  attribution,
  attributionProps,
  ...rest
}: Omit<SlideProps, 'children'> & {
  quote: string;
  quoteProps?: ComponentProps<typeof Text>;
  attribution: string;
  attributionProps?: ComponentProps<typeof Text>;
}) => (
  <Slide {...rest}>
    <Box width="100%" margin="auto">
      <Text fontSize="85px" {...quoteProps}>
        {quote}
      </Text>
      <Text fontSize="36px" padding={'0em 0em 0em 1em'} {...attributionProps}>
        &ndash;{attribution}
      </Text>
    </Box>
  </Slide>
);
/**
 * Layouts to consider:
 * - Image (left, right, full bleed?)
 * - Intro
 * - Code Snippet (syntax highlighting)
 */

export default {
  Full,
  Center,
  TwoColumn,
  List,
  Section,
  BigFact,
  Quote,
  Statement
};
