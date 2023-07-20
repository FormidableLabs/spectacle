/* eslint-disable react/display-name */
import { DeckContext } from '../deck/deck';
import presenterNotesPlugin from '../../utils/remark-rehype-presenter-notes';
import CodePane, { CodePaneProps } from '../code-pane';
import unified from 'unified';
import styled from 'styled-components';
import { compose, layout, position } from 'styled-system';
import remark from 'remark-parse';
import remark2rehype from 'remark-rehype';
import remarkRaw from 'rehype-raw';
import rehype2react from 'rehype-react';
import { isValidElementType } from 'react-is';
import { root as mdRoot } from 'mdast-builder';
import mdxComponentMap from '../../utils/mdx-component-mapper';
import indentNormalizer from '../../utils/indent-normalizer';
import Notes from '../notes';
import { ListItem } from '../../index';
import { Appear } from '../appear';
import React, {
  ElementType,
  FC,
  forwardRef,
  ReactElement,
  useContext,
  useMemo,
  createElement,
  Children
} from 'react';
import { separateSectionsFromJson } from '../../utils/separate-sections-from-json';
import {
  CommonMarkdownProps,
  MapAndTemplate,
  MarkdownSlideSetProps
} from './markdown-types';
import { MarkdownSlide } from './markdown-slide-renderer';
import {
  directiveParserPlugin,
  directivesHandlerPlugin
} from '../../utils/remark-rehype-directive';

type MarkdownProps = CommonMarkdownProps & MapAndTemplate;
const Container = styled('div')(compose(position, layout));

export const Markdown = forwardRef<HTMLDivElement, MarkdownProps>(
  (
    {
      componentMap: userProvidedComponentMap = mdxComponentMap,
      template: { default: TemplateComponent, getPropsForAST } = {
        default: 'div'
      },
      children: rawMarkdownText,
      animateListItems = false,
      componentProps,
      ...props
    },
    ref
  ) => {
    const { theme: { markdownComponentMap: themeComponentMap = null } = {} } =
      useContext(DeckContext);

    const [templateProps, noteElements] = useMemo(() => {
      // Dedent and parse markdown into MDAST
      const markdownText = indentNormalizer(rawMarkdownText);
      const ast = unified().use(remark).parse(markdownText);

      // Extract presenter notes from the MDAST (since we want to use a different
      // component map for them.)
      const extractedNotes = mdRoot();
      const transformedAst = unified()
        .use(presenterNotesPlugin, (...notes) => {
          extractedNotes.children.push(...notes);
        })
        .use(directiveParserPlugin)
        .use(directivesHandlerPlugin)
        .runSync(ast);

      // Pass the AST into the provided template function, which returns an object
      // whose keys are prop names and whose values are chunks of the parsed AST.
      let templatePropMDASTs: any;
      if (typeof getPropsForAST === 'function') {
        templatePropMDASTs = getPropsForAST(transformedAst);
      }

      if (!templatePropMDASTs) {
        templatePropMDASTs = { children: transformedAst };
      }

      // Construct the component map based on the current theme and any custom
      // mappings provided directly to <Markdown />
      const componentMap = {
        __codeBlock: MarkdownCodePane,
        ...(themeComponentMap || {}),
        ...userProvidedComponentMap
      };

      // If user wants to animate list items,
      // wrap ListItem in Appear
      if (animateListItems) {
        componentMap['li'] = AppearingListItem;
      }

      // Create an HOC based on the component map which will specially handle
      // fenced code blocks. (See MarkdownPreHelper for more details.)
      const PreComponent = componentMap['pre'];
      const CodeBlockComponent = componentMap['__codeBlock'];
      const CodeInlineComponent = componentMap['code'];
      componentMap['pre'] = MarkdownPreHelper(
        PreComponent,
        CodeInlineComponent,
        CodeBlockComponent
      );

      const componentMapWithPassedThroughProps = Object.entries(
        componentMap
      ).reduce((newMap, [key, Component]) => {
        newMap[key] = (props: any) => {
          // Replace \r\n and \n with <br /> for paragraphs
          const children =
            key === 'p'
              ? props.children?.map((child: any) => {
                  if (typeof child == 'string') {
                    const lines = child.split(/\r\n|\n/g);
                    return lines.map((str, i) => (
                      <React.Fragment key={i}>
                        {str}
                        {i !== lines.length - 1 && <br />}
                      </React.Fragment>
                    ));
                  }
                  return child;
                })
              : props.children;
          return (
            <Component {...props} {...(componentProps || {})}>
              {children}
            </Component>
          );
        };
        return newMap;
      }, {} as any);

      // Create the compiler for the _user-visible_ markdown (not presenter notes)
      const compiler = unified()
        .use(remark2rehype, { allowDangerousHtml: true })
        .use(remarkRaw)
        .use(rehype2react, {
          createElement,
          components: componentMapWithPassedThroughProps
        });

      // Compile each of the values we got back from the template function
      const templateProps = Object.entries(templatePropMDASTs).reduce(
        (acc, [key, mdast]) => {
          // Transform the MDAST into HAST
          const hast = compiler.runSync(mdast as any);

          // Compile the HAST into React elements
          acc[key] = compiler.stringify(hast);
          return acc;
        },
        {} as any
      );
      // Create the compiler for presenter notes, which wraps the entire compiled
      // chunk in a <Note> component. (Rather than React.Fragment, which is the
      // default behavior.)
      const notesCompiler = unified()
        .use(remark2rehype, { allowDangerousHtml: true })
        .use(remarkRaw)
        .use(rehype2react, {
          createElement,
          Fragment: Notes
        });

      // Transform and compile the notes AST.
      if (
        Array.isArray(extractedNotes.children) &&
        extractedNotes.children.length >= 1
      ) {
        const transformedNotesAst = notesCompiler.runSync(extractedNotes);
        const noteElements = notesCompiler.stringify(transformedNotesAst);
        return [templateProps, noteElements] as const;
      }
      return [templateProps, null] as const;
    }, [
      rawMarkdownText,
      getPropsForAST,
      themeComponentMap,
      userProvidedComponentMap,
      animateListItems,
      componentProps
    ]);

    const { children, ...restProps } = templateProps;

    return (
      <Container ref={ref} {...props}>
        <TemplateComponent {...restProps}>
          {children}
          {noteElements}
        </TemplateComponent>
      </Container>
    );
  }
);

const AppearingListItem = (
  props: React.ComponentPropsWithoutRef<typeof ListItem>
) => (
  <Appear>
    <ListItem {...props} />
  </Appear>
);

export const MarkdownSlideSet = ({
  children: rawMarkdownText,
  slideProps = [],
  ...allSlideProps
}: MarkdownSlideSetProps) => {
  const dedentedMarkdownText = indentNormalizer(rawMarkdownText);
  const mdSlides = separateSectionsFromJson(dedentedMarkdownText);
  return (
    <>
      {mdSlides.map((md, ix) => {
        const props = {};
        Object.assign(props, allSlideProps);
        if (slideProps[ix]) {
          Object.assign(props, slideProps[ix]);
        }
        const { jsonObject = {}, content } = md;
        console.log('jsonObject', jsonObject);
        return (
          <MarkdownSlide key={ix} {...props}>
            {content}
          </MarkdownSlide>
        );
      })}
    </>
  );
};

// This HOC is necessary due to the fact that `remark-rehype` transforms _inline
// code_ into <code>...</code>, but _fenced code blocks_ into
// <pre><code>...</code></pre>. (It's also possible that <pre>...</pre> might
// get in there somewhere.) In order to allow the user to theme these
// differently, we detect the latter case and render CodeBlockComponent if
// needed.
export const MarkdownPreHelper =
  (
    PreComponent: ElementType = 'pre',
    CodeInlineComponent: ElementType = 'code',
    CodeBlockComponent: ElementType
  ): FC<React.HTMLProps<unknown>> =>
  ({ children, ...restProps }) => {
    const pre = <PreComponent {...restProps}>{children}</PreComponent>;

    if (Children.count(children) !== 1) return pre;
    const child = (children as ReactElement[])[0];
    if (child.type !== CodeInlineComponent) return pre;
    if (!isValidElementType(CodeBlockComponent)) return pre;

    // Edge behavior: when `rehype-react` does its transformations, children are
    // always provided as an array, even if there's only one. We extract it here
    // so there are less surprises for implementers of a code block component.
    const {
      children: [rawCode],
      ...restChildProps
    } = child.props;
    return (
      <CodeBlockComponent {...restProps} {...restChildProps}>
        {rawCode}
      </CodeBlockComponent>
    );
  };

const MarkdownCodePane: FC<{ className?: string } & CodePaneProps> = ({
  className,
  children,
  ...rest
}) => {
  const language = useMemo(() => {
    const match = /^language-(.*)$/.exec(className || '');
    return match ? match[1] : undefined;
  }, [className]);

  return (
    <CodePane {...rest} language={language}>
      {children}
    </CodePane>
  );
};
