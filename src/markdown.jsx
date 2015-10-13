import React from "react/addons";
import mdast from "mdast";
import mdastReact from "mdast-react";
import isUndefined from "lodash/lang/isundefined";

import CodePane from "./code-pane";
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
function spectacleComponent(component, boundProps = {}) {
  return React.createClass({
    render(){
      const props = {...this.props, ...boundProps};
      return React.createElement(component, {...props}, this.props.children);
    }
  });
}

export default class Markdown extends React.Component {
  render() {
    const { source, children, mdastConfig } = this.props;
    const content = (isUndefined(source) || source === "") ? children : source;

    return (
      <div>
        {mdast().use(mdastReact, mdastConfig).process(content)}
      </div>
    );
  }
}

Markdown.propTypes = {
  children: React.PropTypes.node,
  source: React.PropTypes.string,
  mdastConfig: React.PropTypes.object
}

Markdown.defaultProps = {
  source: "",
  mdastConfig: {
    commonmark: true,
    mdastReactComponents: {
      a: Link,
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
      li: ListItem,
      p: Text,
      strong: spectacleComponent(S, {type: "bold"}),
      ul: List
    }
  }
};
