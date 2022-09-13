import * as React from 'react';
import styled from 'styled-components';
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
 * Generic List utility
 */
const Outline = ({
  items = [],
  type = 'unordered',
  animate = false,
  listProps
}: (typeof UnorderedList | typeof OrderedList) & {
  items: ReactNode[];
  type?: 'unordered' | 'ordered';
  animate?: boolean;
  listProps?: React.ComponentPropsWithoutRef<
    typeof UnorderedList & typeof OrderedList
  >;
}) => {
  const List = type === 'unordered' ? UnorderedList : OrderedList;

  return (
    <List {...listProps}>
      {items.map((item, i) => {
        const Wrapper = animate ? Appear : Fragment;

        return (
          <Wrapper key={i}>
            <ListItem key={i}>{item}</ListItem>
          </Wrapper>
        );
      })}
    </List>
  );
};

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
  listProps?: React.ComponentPropsWithoutRef<
    typeof UnorderedList & typeof OrderedList
  >;
}) => (
  <Slide {...rest}>
    {title ? (
      <Heading textAlign="left" {...titleProps}>
        {title}
      </Heading>
    ) : null}
    {/* @ts-ignore TODO: Resolve this in follow-up */}
    <Outline
      items={items}
      animate={animateListItems}
      type={listType}
      listProps={listProps}
    />
  </Slide>
);

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
 * Generic styled-component Image utilities
 */
const Img = styled.img`
  min-width: 100%;
  min-height: 100%;
  object-fit: cover;
`;

const ImgContainer = styled(FlexBox).attrs({})`
  height: ${(props) => props.height || '100%'};
  overflow: hidden;
`;

const Image = ({
  src,
  imgContainerProps,
  imgProps
}: {
  src: string;
  imgContainerProps?: ComponentProps<typeof FlexBox>;
  imgProps?: React.ImgHTMLAttributes<HTMLImageElement>;
}) => (
  <ImgContainer {...imgContainerProps}>
    <Img src={src} {...imgProps} />
  </ImgContainer>
);

/**
 * Horizontal Image layout with optional Title and Description
 */
const HorizontalImage = ({
  src,
  title,
  titleProps,
  description,
  descriptionProps,
  imgProps,
  imgContainerProps,
  ...rest
}: Omit<SlideProps, 'children'> & {
  src: string;
  title?: string | ReactNode;
  titleProps?: ComponentProps<typeof Text>;
  description?: string | ReactNode;
  descriptionProps?: ComponentProps<typeof Text>;
  imgProps?: React.ImgHTMLAttributes<HTMLImageElement>;
  imgContainerProps?: ComponentProps<typeof FlexBox>;
}) => {
  return (
    <Slide {...rest}>
      <Image
        src={src}
        imgContainerProps={{
          width: '100%',
          ...imgContainerProps
        }}
        imgProps={imgProps}
      />
      {title ? (
        <Heading textAlign="left" margin="0 0" {...titleProps}>
          {title}
        </Heading>
      ) : null}
      {description ? (
        <Text margin="0 0" {...descriptionProps}>
          {description}
        </Text>
      ) : null}
    </Slide>
  );
};

/**
 * Image and List layout with optional Title
 */
const VerticalImage = ({
  src,
  title,
  titleProps,
  listType = 'unordered',
  listItems,
  animateListItems = false,
  listProps,
  imgProps,
  imgContainerProps,
  position = 'right',
  ...rest
}: Omit<SlideProps, 'children'> & {
  src: string;
  listItems: ReactNode[];
  title?: string | ReactNode;
  titleProps?: ComponentProps<typeof Heading>;
  listType?: 'unordered' | 'ordered';
  animateListItems?: boolean;
  listProps?: React.ComponentPropsWithoutRef<
    typeof UnorderedList & typeof OrderedList
  >;
  imgProps?: React.ImgHTMLAttributes<HTMLImageElement>;
  imgContainerProps?: ComponentProps<typeof FlexBox>;
  position?: 'right' | 'left';
}) => {
  return (
    <Slide padding="0 0 0" {...rest}>
      {title ? <Heading {...titleProps}>{title}</Heading> : null}
      <Grid
        gridColumnGap={2}
        gridTemplateColumns={'repeat(2, 1fr)'}
        style={{ padding: title ? '0 32px 0' : '32px' }}
      >
        <FlexBox justifyContent="start">
          {/* @ts-ignore TODO: Resolve this in follow-up */}
          <Outline
            items={listItems}
            animate={animateListItems}
            type={listType}
            {...listProps}
          />
        </FlexBox>
        <Image
          src={src}
          imgContainerProps={{
            height: title ? '550px' : '700px',
            order: position === 'right' ? 1 : -1,
            ...imgContainerProps
          }}
          imgProps={imgProps}
        />
      </Grid>
    </Slide>
  );
};

/**
 * Image 3-up layout
 */
const ThreeUpImage = ({
  primary,
  top,
  bottom,
  ...rest
}: Omit<SlideProps, 'children'> & {
  primary: {
    src: string;
    position?: 'right' | 'left';
    imgProps?: React.ImgHTMLAttributes<HTMLImageElement>;
    imgContainerProps?: ComponentProps<typeof FlexBox>;
  };
  top: {
    src: string;
    imgProps?: React.ImgHTMLAttributes<HTMLImageElement>;
    imgContainerProps?: ComponentProps<typeof FlexBox>;
  };
  bottom: {
    src: string;
    imgProps?: React.ImgHTMLAttributes<HTMLImageElement>;
    imgContainerProps?: ComponentProps<typeof FlexBox>;
  };
}) => {
  return (
    <Slide {...rest}>
      <Grid gridColumnGap={2} gridTemplateColumns={'repeat(2, 1fr)'}>
        <Grid gridRowGap={2} gridTemplateRows={'repeat(2, .5fr)'}>
          <Image
            src={top.src}
            imgContainerProps={{ maxHeight: '350px', ...top.imgContainerProps }}
            imgProps={top.imgProps}
          />
          <Image
            src={bottom.src}
            imgContainerProps={{
              maxHeight: '350px',
              ...bottom.imgContainerProps
            }}
            imgProps={bottom.imgProps}
          />
        </Grid>

        <Image
          imgContainerProps={{
            height: '700px',
            width: '625px',
            order: primary.position === 'right' ? 1 : -1,
            ...primary.imgContainerProps
          }}
          src={primary.src}
          imgProps={primary.imgProps}
        />
      </Grid>
    </Slide>
  );
};

/**
 * Full Bleed Image layout
 */
const FullBleedImage = ({
  src,
  imgProps,
  imgContainerProps,
  ...rest
}: Omit<SlideProps, 'children'> & {
  src: string;
  imgProps?: React.ImgHTMLAttributes<HTMLImageElement>;
  imgContainerProps?: ComponentProps<typeof FlexBox>;
}) => (
  <Slide padding="0 0 0" {...rest}>
    <Image
      src={src}
      imgProps={imgProps}
      imgContainerProps={imgContainerProps}
    />
  </Slide>
);

/**
 * Layouts to consider:
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
  HorizontalImage,
  VerticalImage,
  ThreeUpImage,
  FullBleedImage
};
