/* eslint-disable react/display-name */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/prop-types */

import * as React from 'react';
import Slide from '../slide/slide';
import { DeckContext } from '../deck/deck';
import presenterNotesPlugin from '../../utils/remark-rehype-presenter-notes';
import CodePane from '../code-pane';
import unified from 'unified';
import remark from 'remark-parse';
import mdastAssert from 'mdast-util-assert';
import remark2rehype from 'remark-rehype';
import remarkRaw from 'rehype-raw';
import rehype2react from 'rehype-react';
import { isValidElementType } from 'react-is';
import { root as mdRoot } from 'mdast-builder';
import mdxComponentMap from '../../utils/mdx-component-mapper';
import indentNormalizer from '../../utils/indent-normalizer';
import Notes from '../notes';
import { ListItem } from '../../index';
import Appear from '../appear';

export const Markdown = ({
  componentMap: userProvidedComponentMap = mdxComponentMap,
  template: { default: TemplateComponent, getPropsForAST } = {
    default: 'div'
  },
  children: rawMarkdownText,
  animateListItems = false,
  componentProps
}) => {
  const {
    theme: { markdownComponentMap: themeComponentMap } = {}
  } = React.useContext(DeckContext);

  const [templateProps, noteElements] = React.useMemo(() => {
    // Dedent and parse markdown into MDAST
    const markdownText = indentNormalizer(rawMarkdownText);
    const ast = unified()
      .use(remark)
      .parse(markdownText);

    // Extract presenter notes from the MDAST (since we want to use a different
    // component map for them.)
    const extractedNotes = mdRoot();
    const transformedAst = unified()
      .use(presenterNotesPlugin, (...notes) => {
        extractedNotes.children.push(...notes);
      })
      .runSync(ast);

    // Pass the AST into the provided template function, which returns an object
    // whose keys are prop names and whose values are chunks of the parsed AST.
    let templatePropMDASTs;
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
      newMap[key] = props => (
        <Component {...props} {...(componentProps || {})} />
      );
      return newMap;
    }, {});

    // Create the compiler for the _user-visible_ markdown (not presenter notes)
    const compiler = unified()
      .use(remark2rehype, { allowDangerousHtml: true })
      .use(remarkRaw)
      .use(rehype2react, {
        createElement: React.createElement,
        components: componentMapWithPassedThroughProps
      });

    // Compile each of the values we got back from the template function
    const templateProps = Object.entries(templatePropMDASTs).reduce(
      (acc, [key, mdast]) => {
        // Make sure what we got was actually MDAST
        mdastAssert(mdast);

        // Transform the MDAST into HAST
        const hast = compiler.runSync(mdast);

        // Compile the HAST into React elements
        acc[key] = compiler.stringify(hast);
        return acc;
      },
      {}
    );
    // Create the compiler for presenter notes, which wraps the entire compiled
    // chunk in a <Note> component. (Rather than React.Fragment, which is the
    // default behavior.)
    const notesCompiler = unified()
      .use(remark2rehype, { allowDangerousHtml: true })
      .use(remarkRaw)
      .use(rehype2react, {
        createElement: React.createElement,
        Fragment: Notes
      });

    // Transform and compile the notes AST.
    const transformedNotesAst = notesCompiler.runSync(extractedNotes);
    const noteElements = notesCompiler.stringify(transformedNotesAst);

    return [templateProps, noteElements];
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
    <TemplateComponent {...restProps}>
      {children}
      {noteElements}
    </TemplateComponent>
  );
};

const AppearingListItem = props => (
  <Appear>
    <ListItem {...props} />
  </Appear>
);

// TODO: document this thoroughly, it's a public-facing API
export const MarkdownSlide = ({
  children,
  componentMap,
  template,
  animateListItems = false,
  componentProps = {},
  ...rest
}) => {
  return (
    <Slide {...rest}>
      <Markdown
        {...{
          componentMap,
          template,
          animateListItems,
          componentProps,
          children
        }}
      />
    </Slide>
  );
};

// TODO: document this thoroughly, it's a public-facing API (possibly rename as
// well)
export const MarkdownSlideSet = ({
  children: rawMarkdownText,
  slideProps = {},
  ...allSlideProps
}) => {
  const dedentedMarkdownText = indentNormalizer(rawMarkdownText);
  const mdSlides = dedentedMarkdownText.split(/\n\s*---\n/);
  return (
    <>
      {mdSlides.map((md, ix) => {
        const props = {};
        Object.assign(props, allSlideProps);
        if (slideProps[ix]) {
          Object.assign(props, slideProps[ix]);
        }
        return (
          <MarkdownSlide key={ix} {...props}>
            {md}
          </MarkdownSlide>
        );
      })}
      ;
    </>
  );
};

// This HOC is necessary due to the fact that `remark-rehype` transforms _inline
// code_ into <code>...</code>, but _fenced code blocks_ into
// <pre><code>...</code></pre>. (It's also possible that <pre>...</pre> might
// get in there somewhere.) In order to allow the user to theme these
// differently, we detect the latter case and render CodeBlockComponent if
// needed.
export const MarkdownPreHelper = (
  PreComponent = 'pre',
  CodeInlineComponent = 'code',
  CodeBlockComponent
) => ({ children, ...restProps }) => {
  const pre = <PreComponent {...restProps}>{children}</PreComponent>;

  if (React.Children.count(children) !== 1) return pre;
  if (children[0].type !== CodeInlineComponent) return pre;
  if (!isValidElementType(CodeBlockComponent)) return pre;

  // Edge behavior: when `rehype-react` does its transformations, children are
  // always provided as an array, even if there's only one. We extract it here
  // so there are less surprises for implementers of a code block component.
  const {
    children: [rawCode],
    ...restChildProps
  } = children[0].props;
  return (
    <CodeBlockComponent {...restProps} {...restChildProps}>
      {rawCode}
    </CodeBlockComponent>
  );
};

export const MarkdownCodePane = ({ className, children, ...rest }) => {
  const language = React.useMemo(() => {
    let match;
    if ((match = /^language-(.*)$/.exec(className))) {
      return match[1];
    }
  }, [className]);

  return (
    <CodePane {...rest} language={language}>
      {children}
    </CodePane>
  );
};
