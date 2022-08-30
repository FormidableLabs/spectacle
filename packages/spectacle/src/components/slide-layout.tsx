import Slide, { SlideProps } from './slide/slide';
import { Box, FlexBox } from './layout-primitives';
import CodePane from './code-pane';
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
  children,
  ...rest
}: SlideProps & {
  flexBoxProps?: ComponentProps<typeof FlexBox>;
  headingProps?: ComponentProps<typeof Heading>;
}) => (
  <Slide {...rest}>
    <FlexBox height="100%" {...flexBoxProps}>
      <Heading {...headingProps}>{children}</Heading>
    </FlexBox>
  </Slide>
);

/**
 * Section layout with left aligned text
 */
const Section = ({
  sectionProps,
  children,
  ...rest
}: SlideProps & {
  sectionProps?: ComponentProps<typeof Heading>;
}) => (
  <Header
    headingProps={sectionProps}
    flexBoxProps={{ justifyContent: 'flex-start' }}
  >
    {children}
  </Header>
);

/**
 * Statement layout with centered text
 */
const Statement = ({
  statementProps,
  children,
  ...rest
}: SlideProps & {
  statementProps?: ComponentProps<typeof Heading>;
}) => <Header headingProps={statementProps}>{children}</Header>;

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
  fact: string | ReactNode;
  factInformation?: string | ReactNode;
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
  quote: string | ReactNode;
  quoteProps?: ComponentProps<typeof Text>;
  attribution: string | ReactNode;
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
 * Generic Codepane utility with optional Description text
 */
const CodeLayout = ({
  children,
  language,
  key,
  text,
  textProps,
  ...props
}: SlideProps & {
  children: string;
  language: string;
  key?: number;
  text?: string | ReactNode;
  textProps?: ComponentProps<typeof Text>;
}) => (
  <Box key={key}>
    {text ? (
      <Text margin={8} {...textProps}>
        {text}
      </Text>
    ) : null}
    <CodePane language={language} {...props}>
      {children}
    </CodePane>
  </Box>
);

/**
 * single Code Pane with optional Title layout
 */
const SingleCodeLayout = ({
  children,
  language,
  title,
  titleProps,
  ...rest
}: SlideProps & {
  children: string;
  language: string;
  title?: string | ReactNode;
  titleProps?: ComponentProps<typeof Text>;
}) => {
  return (
    <Slide {...rest}>
      <FlexBox
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        {title ? <Heading {...titleProps}>{title}</Heading> : null}
        <CodeLayout language={language} {...rest}>
          {children}
        </CodeLayout>
      </FlexBox>
    </Slide>
  );
};

/**
 * multiple Code Panes with optional Description, with optional Title layout
 */
const MultiCodeLayout = ({
  children,
  title,
  titleProps,
  textProps,
  ...rest
}: SlideProps & {
  children: {
    code: string;
    language: string;
    description?: string | ReactNode;
  }[];
  title?: string | ReactNode;
  titleProps?: ComponentProps<typeof Text>;
  textProps: ComponentProps<typeof Text>;
}) => {
  return (
    <Slide {...rest}>
      <FlexBox
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        {title ? <Heading {...titleProps}>{title}</Heading> : null}
        {children.map(({ code, language, description, ...props }, i) => (
          <CodeLayout key={i} text={description} language={language} {...props}>
            {code}
          </CodeLayout>
        ))}
      </FlexBox>
    </Slide>
  );
};

/**
 * Layouts to consider:
 * - Image (left, right, full bleed?)
 * - Intro
 */

export default {
  Full,
  Center,
  TwoColumn,
  List,
  Section,
  BigFact,
  Quote,
  Statement,
  SingleCodeLayout,
  MultiCodeLayout
};
