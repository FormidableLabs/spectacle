import markdown from "markdown-it/dist/markdown-it";
import React, { PropTypes } from "react";
import isPlainObject from "lodash/isPlainObject";
import reduce from "lodash/reduce";
import zipObject from "lodash/zipObject";
import sortBy from "lodash/sortBy";
import compact from "lodash/compact";
import camelCase from "lodash/camelCase";
import isString from "lodash/isString";
import fromPairs from "lodash/fromPairs";
import isUndefined from "lodash/isUndefined";

import BlockQuote from "./block-quote";
import CodePane from "./code-pane";
import Code from "./code";
import Image from "./image";
import List from "./list";
import ListItem from "./list-item";
import Link from "./link";
import Heading from "./heading";
import Quote from "./quote";
import S from "./s";
import Text from "./text";

import MarkdownWrapper from "./markdown-wrapper";
import MarkdownHTMLElement from "./markdown-html-element";

const DEFAULT_TAGS = {
  html: "wrapper"
};

const EMPTY_HTML_ELEMENTS = {
  "area": true,
  "base": true,
  "br": true,
  "col": true,
  "colgroup": false,
  "command": true,
  "embed": true,
  "hr": true,
  "img": true,
  "input": true,
  "keygen": true,
  "link": true,
  "meta": true,
  "param": true,
  "source": true,
  "track": true,
  "wbr": true
};

const regexIndexOf = function (str, regex, startpos = 0) {
  const indexOf = str.substring(startpos).search(regex);
  return (indexOf >= 0) ? (indexOf + (startpos)) : indexOf;
};

/**
 * Transforms any inline HTML from text to real HTML
 * 
 * @param {any} children
 * @param {any} props
 * @returns
 */
const makeChildren = function (children, props) {
  const result = [];
  let keyCounter = 0;
  let openTags = 0;
  let htmlContent = [];

  if (!Array.isArray(children)) {
    children = [].push(children);
  }

  /**
   * Push all normal children to result.
   * If we find an opening tag, we push the content to the htmlContent
   *  -> now every child is pushed to htmlContent until we find an closing tag
   *  -> if there are multiple opening tags, we wait until we found the last closing one
   *
   * WARNING: This will fail if somebody injects errornous HTML code, which prevents to render the node at all.
   */

  // ToDo: Handle tags without children: https://github.com/component/domify/blob/master/index.js
  // ToDo: Check if we something left on the stack and print an error message, that the user has input invalid HTML

  for (let child of children) {
    if (child.type && child.type === "htmlinline") {
      const groups = /<([\w:]+)/.exec(child.content);
      const elementTag = groups && groups.length === 2 ? groups[1] : null;
      const isEmptyElement = EMPTY_HTML_ELEMENTS[elementTag] === true;

      // 1. Is opening Tag?
      if (regexIndexOf(child.content, /<\s*\/.*>/) < 0 && !isEmptyElement) {
        openTags += 1;
        htmlContent.push(child.content);
      } else if (isEmptyElement) {
        // when we deal with an empty element, just add this and proceed
        const {key, ...rest} = props; // Extract key from props
        keyCounter += 1;
        result.push(<MarkdownHTMLElement key={`${key}-inlinehtml-${keyCounter}`} {...rest} displayMode={false} content={child.content} />);
      } else {
        // closing tag
        openTags -= 1;
        htmlContent.push(child.content);

        // done
        if (openTags === 0) {
          let {key, ...rest} = props; // Extract key from props
          result.push(<MarkdownHTMLElement key={`${key}-inlinehtml-${keyCounter}`} {...rest} displayMode={false} content={htmlContent.join("")} />);
          keyCounter += 1;
          htmlContent = []; // Reset
        }
      }
    } else if (openTags > 0) {
      // add child to html
      htmlContent.push(child);
    } else {
      result.push(child);
    }
  }

  return result;
};

export function defaultOnIterate(tag, props, children) {
  /**
   * The onIterate function is doing the actual work. It transforms the Mardown Nodes
   * to React Nodes and passes in the props and children.
   */
  let lang;
  let content;
  let source;

  if (props.class != null) {
    props.className = props.class;
  }

  // Maybe we need here a more generic solution with a simple mapping
  if (props["max-width"]) {
    if (props.style == null) {
      props.style = {};
    }

    props.style.maxWidth = props["max-width"];
  }

  // Remove propagated source prop
  if (props.source) {
    delete props.source;
  }

  switch (tag) {
    case "a":
      content = makeChildren(children, props);
      return <Link href={props.href} target="_blank" {...props}>{content}</Link>;

    case "code":
      content = Array.isArray(children) ? children.join("") : children;
      return <Code {...props}>{content}</Code>;

    case "pre":
      if (isString(children[0])) {
        source = children[0];
      } else {
        source = children[0].props.children;
      }

      if (Array.isArray(source)) {
        source = source.join("");
      }

      lang = children[0].props["data-language"] || null;
      return <CodePane lang={lang} source={source} {...props} />;

    case "p":
      content = makeChildren(children, props);
      return <Text lineHeight={1.2} {...props}>{content}</Text>;

    case "img":
      console.info('Markdown-Image', props);
      return <Image {...props} />;

    case "h1":
      content = makeChildren(children, props);
      return <Heading size={1} {...props}>{content}</Heading>;
    case "h2":
      content = makeChildren(children, props);
      return <Heading size={2} {...props}>{content}</Heading>;
    case "h3":
      content = makeChildren(children, props);
      return <Heading size={3} {...props}>{content}</Heading>;
    case "h4":
      content = makeChildren(children, props);
      return <Heading size={4} {...props}>{content}</Heading>;
    case "h5":
      content = makeChildren(children, props);
      return <Heading size={5} {...props}>{content}</Heading>;
    case "h6":
      content = makeChildren(children, props);
      return <Heading size={6} {...props}>{content}</Heading>;

    case "em":
      content = makeChildren(children, props);
      return <S type="italic" {...props}>{content}</S>;

    case "del":
      content = makeChildren(children, props);
      return <S type="strikethrough" {...props}>{content}</S>;

    case "strong":
      content = makeChildren(children, props);
      return <S type="bold" {...props}>{content}</S>;

    case "blockquote":
      content = makeChildren(children, props);
      return <BlockQuote><Quote>{content}</Quote></BlockQuote>;

    case "li":
      content = makeChildren(children, props);
      return <ListItem {...props}>{content}</ListItem>;

    case "ul":
      return <List {...props}>{children}</List>;

    case "ol":
      return <List ordered {...props}>{children}</List>;

    case "htmlblock":
      content = Array.isArray(children) ? children.join("") : children;
      return <MarkdownHTMLElement content={content} {...props} />;

    /**
     * Special inline HTML treatment to embed the HTML as HTML-Nodes and not as escaped text.
     * Requires to use makeChildren function to get the transformed list of children.
     */
    case "htmlinline":
      content = Array.isArray(children) ? children.join("") : children;
      return {
        type: "htmlinline",
        content
      };

    case "wrapper":
      return <MarkdownWrapper {...props}>{children}</MarkdownWrapper>;

    default:
      return null; // now our factory is going to create the tag with React.createElement
  }
}

export const defaultMarkdownOptions = {
  html: true,
  linkify: true
};

export const defaultMarkdownPlugins = [];

/**
 * Markdown Node Rules to create a Markdown AST
 */
const DEFAULT_RULES = {
  image(token, attrs, children) {
    if (children.length) {
      attrs = Object.assign({}, attrs, { alt: children[0] });
    }
    return [[token.tag, attrs]];
  },

  codeInline(token, attrs) {
    return [compact([token.tag, attrs, token.content])];
  },

  codeBlock(token, attrs) {
    return [["pre", compact([token.tag, attrs, token.content])]];
  },

  fence(token, attrs) {
    if (token.info) {
      const langName = token.info.trim().split(/\s+/g)[0];
      attrs = Object.assign({}, attrs, { "data-language": langName });
    }

    return [["pre", compact([token.tag, attrs, token.content])]];
  },

  hardbreak() {
    return [["br"]];
  },

  softbreak(token, attrs, children, options) {
    return options.breaks ? [["br"]] : "\n";
  },

  text(token) {
    return token.content;
  },

  htmlBlock(token, attrs) {
    return [compact(["htmlblock", attrs, token.content])];
  },

  htmlInline(token, attrs) {
    return [compact(["htmlinline", attrs, token.content])];
  },

  inline(token, attrs, children) {
    return children;
  },

  mathInline(token, attrs) {
    return [compact([token.tag, Object.assign({}, attrs, { display: "inline" }), token.content])];
  },

  mathBlock(token, attrs) {
    return [compact([token.tag, Object.assign({}, attrs, { display: "block" }), token.content])];
  },

  default(token, attrs, children, options, getNext) {
    if (token.nesting === 1 && token.hidden) {
      return getNext();
    }
    /* plugin-related */
    if (!token.tag) {
      return token.content;
    }

    if (token.info) {
      attrs = Object.assign({}, attrs, { "data-info": token.info.trim() });
    }

    /* plugin-related */
    return [compact([token.tag, attrs].concat((token.nesting === 1) && getNext()))];
  }
};

/**
 * Recursiv Markdown Tree converting function using the above rules and options.
 *
 * @param {any} tokens
 * @param {any} convertRules
 * @param {any} options
 * @returns
 */
const convertTree = function (tokens, convertRules, options) {
  const convertBranch = function (tkns, nested) {
    let branch = [];

    if (!nested) {
      branch.push("html");
    }

    const getNext = function () {
      return convertBranch(tkns, true);
    };

    let token = tkns.shift();
    while (token && token.nesting !== -1) {
      const attrs = token.attrs && fromPairs(sortBy(token.attrs, 0));
      const children = token.children && convertBranch(token.children.slice(), true);
      const rule = convertRules[camelCase(token.type)] || convertRules.default;

      branch = branch.concat(
        rule(token, attrs, children, options, getNext)
      );
      token = tkns.shift();
    }
    return branch;
  };

  return convertBranch(tokens, false);
};

const mdReactFactory = function (options = {}) {
  const {
    onIterate,
    tags = DEFAULT_TAGS,
    presetName,
    markdownOptions,
    enableRules = [],
    disableRules = [],
    plugins = [],
    onGenerateKey = (tag, index) => `mdrct-${tag}-${index}`,
    ...rootElementProps
  } = options;

  // Create Markdown-it renderer with our custom options
  let md = markdown(markdownOptions || presetName)
    .enable(enableRules)
    .disable(disableRules);

  const convertRules = Object.assign({}, DEFAULT_RULES, options.convertRules);

  md = reduce(plugins, (m, plugin) => (
    plugin.plugin
      ? m.use(plugin.plugin, ...plugin.args)
      : m.use(plugin)
    ), md
  );

  /**
   * Simple function to determine if we need to render children or not.
   *
   * @param {any} tag
   * @returns
   */
  const renderChildren = function (tag) {
    return ["img", "hr", "br"].indexOf(tag) < 0;
  };

  const iterateTree = function (tree, level = 0, index = 0) {
    let tag = tree.shift();
    const key = onGenerateKey(tag, index);

    let props = (tree.length && isPlainObject(tree[0]))
      ? Object.assign(tree.shift(), { key })
      : { key };

    if (level === 0) {
      props = { ...props, ...rootElementProps };
    }

    const children = tree.map(
      (branch, idx) =>
        Array.isArray(branch)
          ? iterateTree(branch, level + 1, idx)
          : branch
    );

    tag = tags[tag] || tag;

    // Transform styles to react
    if (isString(props.style)) {
      props.style = zipObject(
        props.style.split(";")
        .map((prop) => prop.split(":"))
        .map((keyVal) => [camelCase(keyVal[0].trim()), keyVal[1].trim()])
      );
    }

    // Check for custom iterate function
    if ((typeof onIterate === "function")) {
      const element = onIterate(tag, props, children, level);
      if (element) {
        return element;
      }
    }
    return React.createElement(tag, props, renderChildren(tag) ? children : undefined);
  };

  return function (text) {
    const tree = convertTree(md.parse(text, {}), convertRules, md.options);
    return iterateTree(tree);
  };
};

/**
 * MarkdownReact Component, that does the rendering
 */
export default class Markdown extends React.Component {
  shouldComponentUpdate(nextProps) {
    // Only update if the markdown text changes!
    return this.props.source !== nextProps.source;
  }

  render() {
    const { source, children, ...propsWithoutText } = this.props;
    const content = (isUndefined(source) || source === "") ? children : source;

    return mdReactFactory(propsWithoutText)(content);
  }
}

Markdown.propTypes = {
  children: PropTypes.node,
  source: PropTypes.string.isRequired,
  onIterate: PropTypes.func,
  onGenerateKey: PropTypes.func,
  tags: PropTypes.object,
  presetName: PropTypes.string,
  markdownOptions: PropTypes.object,
  enableRules: PropTypes.array,
  disableRules: PropTypes.array,
  convertRules: PropTypes.object,
  plugins: PropTypes.array,
  className: PropTypes.string
};

Markdown.defaultProps = {
  source: "",
  onIterate: defaultOnIterate,
  markdownOptions: defaultMarkdownOptions,
  plugins: defaultMarkdownPlugins,
  enableRules: [],
  disableRules: []
};

export { mdReactFactory as mdReact };