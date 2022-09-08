import * as React from 'react';
import Slide, { SlideProps } from './slide/slide';
import { Box, FlexBox, Grid } from './layout-primitives';
import CodePane, { CodePaneProps } from './code-pane';
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
  children
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
  children
}: SlideProps & {
  statementProps?: ComponentProps<typeof Heading>;
}) => <Header headingProps={statementProps}>{children}</Header>;

/**
 * Big Fact with optional fact information
 */
const BigFact = ({
  children,
  factInformation,
  factProps,
  factFontSize = '250px',
  factInformationProps,
  ...rest
}: SlideProps & {
  factInformation?: string | ReactNode;
  factProps?: ComponentProps<typeof Text>;
  factFontSize?: string;
  factInformationProps?: ComponentProps<typeof Text>;
}) => (
  <Slide {...rest}>
    <FlexBox>
      <Box>
        <Text textAlign="center" fontSize={factFontSize} {...factProps}>
          {children}
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
  children,
  quoteProps,
  attribution,
  attributionProps,
  ...rest
}: SlideProps & {
  quoteProps?: ComponentProps<typeof Text>;
  attribution: string | ReactNode;
  attributionProps?: ComponentProps<typeof Text>;
}) => (
  <Slide {...rest}>
    <Box width="100%" margin="auto">
      <Text fontSize="85px" {...quoteProps}>
        {children}
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
  text,
  textProps,
  children,
  ...props
}: CodePaneProps & {
  text?: string | ReactNode;
  textProps?: ComponentProps<typeof Text>;
}) => (
  <Box data-testid="CodePane">
    {text ? (
      <Text margin={8} {...textProps}>
        {text}
      </Text>
    ) : null}
    <CodePane {...props}>{children}</CodePane>
  </Box>
);

/**
 * single Code Pane with optional Title layout
 */
const Code = ({
  children,
  language,
  title,
  titleProps,
  codePaneProps,
  ...rest
}: Omit<SlideProps, 'children'> & {
  children: string;
  language: string;
  title?: string | ReactNode;
  titleProps?: ComponentProps<typeof Text>;
  codePaneProps?: CodePaneProps;
}) => {
  return (
    <Slide {...rest}>
      <Box display="inline-block" style={{ overflow: 'scroll' }}>
        {title ? <Heading {...titleProps}>{title}</Heading> : null}
        <CodeLayout language={language} {...codePaneProps}>
          {children}
        </CodeLayout>
      </Box>
    </Slide>
  );
};

/**
 * multiple Code Panes with optional Description, with optional Title layout
 */
const MultiCodeLayout = ({
  codeBlocks,
  title,
  titleProps,
  numColumns = 1,
  ...rest
}: Omit<SlideProps, 'children'> & {
  codeBlocks: Array<
    Omit<CodePaneProps, 'children'> & {
      code: CodePaneProps['children'];
      description?: string | ReactNode;
      descriptionProps?: ComponentProps<typeof Text>;
    }
  >;
  title?: string | ReactNode;
  titleProps?: ComponentProps<typeof Text>;
  numColumns?: number;
}) => {
  return (
    <Slide {...rest}>
      <Box display="inline-block" style={{ overflow: 'scroll' }}>
        {title ? <Heading {...titleProps}>{title}</Heading> : null}
        <Grid
          gridRowGap={1}
          gridColumnGap={1}
          gridTemplateColumns={`repeat(${numColumns}, minmax(100px, 1fr))`}
          maxWidth="100%"
        >
          {codeBlocks.map(
            ({ description, descriptionProps, code, ...codePaneProps }, i) => (
              <CodeLayout
                key={i}
                text={description}
                textProps={descriptionProps}
                {...codePaneProps}
              >
                {code}
              </CodeLayout>
            )
          )}
        </Grid>
      </Box>
    </Slide>
  );
};

/**
 * Full Bleed Image layout
 */
const FullBleedImage = ({
  src,
  imgProps,
  flexBoxProps,
  ...rest
}: Omit<SlideProps, 'children'> & {
  src: string;
  imgProps?: React.ImgHTMLAttributes<HTMLImageElement>;
  flexBoxProps?: ComponentProps<typeof FlexBox>;
}) => (
  <Slide padding="0 0 0" {...rest}>
    <FlexBox
      style={{
        height: '100%',
        overflow: 'hidden'
      }}
      {...flexBoxProps}
    >
      <img
        src={src}
        style={{ minWidth: '100%', minHeight: '100%', flexShrink: '0' }}
        {...imgProps}
      />
    </FlexBox>
  </Slide>
);

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
  Code,
  MultiCodeLayout,
  FullBleedImage
};
