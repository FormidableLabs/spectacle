import React, { Component, PropTypes } from "react";
import mdast from "mdast";
import mdastReact from "mdast-react";
import { isUndefined } from "lodash";

import BlockQuote from "./block-quote";
import CodePane from "./code-pane";
import Code from "./code";
import Heading from "./heading";
import Image from "./image";
import Link from "./link";
import List from "./list";
import ListItem from "./list-item";
import Quote from "./quote";
import S from "./s";
import Text from "./text";

// We can't pass props into mdast-react directly, so we have to "bind" them
// to spectacle components (ex. headings, strong/em/del)
const spectacleComponent = (component, boundProps = {}) => {
  return React.createClass({
    propTypes() {
      return {
        children: PropTypes.children
      };
    },
    render() {
      const props = {...this.props, ...boundProps};
      return React.createElement(component, {...props}, this.props.children);
    }
  });
};

// Spectacle requires a <Quote> inside a <BlockQuote>
class CombinedBlockQuote extends Component {
  render() {
    return <BlockQuote><Quote>{this.props.children}</Quote></BlockQuote>;
  }
}

CombinedBlockQuote.propTypes = {
  children: PropTypes.object
};

// We export the default config so people can extend it themselves
export const mdastConfigDefault = {
  commonmark: true,
  paragraphBlockquotes: false,
  mdastReactComponents: {
    a: Link,
    blockquote: CombinedBlockQuote,
    code: CodePane,
    del: spectacleComponent(S, {type: "strikethrough"}),
    em: spectacleComponent(S, {type: "italic"}),
    h1: spectacleComponent(Heading, {size: 1}),
    h2: spectacleComponent(Heading, {size: 2}),
    h3: spectacleComponent(Heading, {size: 3}),
    h4: spectacleComponent(Heading, {size: 4}),
    h5: spectacleComponent(Heading, {size: 5}),
    h6: spectacleComponent(Heading, {size: 6}),
    img: Image,
    inlineCode: Code,
    li: ListItem,
    p: Text,
    strong: spectacleComponent(S, {type: "bold"}),
    ul: List
  }
};

export default class Markdown extends React.Component {
  render() {
    const { source, children, mdastConfig } = this.props;
    const content = (isUndefined(source) || source === "") ? children : source;

    return (
      <div style={this.props.style}>
        {mdast().use(mdastReact, mdastConfig).process(content)}
      </div>
    );
  }
}

Markdown.propTypes = {
  style: PropTypes.object,
  children: PropTypes.node,
  source: PropTypes.string,
  mdastConfig: PropTypes.object
};

Markdown.defaultProps = {
  style: {},
  source: "",
  mdastConfig: mdastConfigDefault
};
