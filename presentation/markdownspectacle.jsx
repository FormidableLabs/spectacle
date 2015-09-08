/*global window*/

import React from "react/addons";
import Base from "../src/base";
import Radium from "radium";
import marked from "./marked";
import {
  Appear, BlockQuote, Cite, CodePane, Deck, Fill,
  Heading, Image, Layout, Link, ListItem, List, Quote, Slide, Text, S
} from "../src/spectacle";

class SpectacleMarkdown extends Base {
  constructor(props) {
    super(props);
    this.state = {
      tree: [],
      inlineIds: 0,
      keys: 0,
      inlines: {}
    };

    if(marked) {
        // set up markdown options, maybe later we can make them options
        marked.setOptions({
          gfm: true,
            highlight: function( lang, code ) {
                return hljs.highlightAuto( lang, code ).value;
            },
            math: {
                render: function (tex) {
                  return katex.renderToString(tex);
                }
            }
        });
    }

    let md = "";

    if (this.props.source) {
      md = this.props.source;
    } else if (this.props.children) {
      md = _.isArray(this.props.children)
    ? this.props.children.join('') : this.props.children;
    }

    const rendered = marked(md, {renderer: this.customRenderer()});
    this.state.rawOutput = rendered;
  }

  customRenderer() {
    const that = this;
    const renderer = new marked.Renderer();

    renderer.code = function (code, language) {
      that.state.tree.push(<pre key={that.state.keys++}>{code}</pre>);
    };

    renderer.blockquote = function (quote) {
      that.state.tree.pop();
      that.state.tree.push(<BlockQuote key={that.state.keys++}><Quote>{quote}</Quote></BlockQuote>);
    };

    // How does this happen?
    renderer.html = function (html) {
      that.state.tree.push(html);
    };

    renderer.heading = function (text, level) {
      if (!level) {
        level = 1;
      }
      that.state.tree.push(<Heading key={that.state.keys++} size={level} fit caps textColor="black">{text}</Heading>);
    };

    renderer.hr = function () {
      that.state.tree.push(<hr key={that.state.keys++}/>);
    };

    renderer.listitem = function (text) {
      const id = that.state.inlineIds++;
      that.state.inlines[id] = <ListItem>{text}</ListItem>;
      return {id};
    };

    renderer.list = function (body, ordered) {
      that.state.tree.push(<List key={that.state.keys++}>{body}</List>);
    };

    renderer.paragraph = function (text) {
      const id = that.state.inlineIds++;
      that.state.inlines[id] = <Text key={that.state.keys++} fit textColor="black">{text}</Text>;
      that.state.tree.push(that.state.inlines[id]);
      return {id};
    };

    renderer.table = function (header, body) {
      that.state.tree.push(React.createElement('table', null, header, body));
    };

    renderer.tablerow = function (content) {
      return <tr>{content}</tr>;
    };

    renderer.tablecell = function (content, flags) {
      return <td>{content}</td>;
    };

    renderer.link = function (href, title, text) {
      return <Link href="{href}" title="{title}">{text}</Link>;
    };

    renderer.strong = function (text) {
      return <S type={["bold"]}>{text}</S>;
    };

    renderer.em = function (text) {
      return <S type={["italic"]}>{text}</S>;
    };

    renderer.codespan = function (text) {
      return <code>{text}</code>;
    };

    renderer.br = function () {
      return <br/>;
    };

    renderer.del = function (text) {
      return <S type={["strikethrough"]}>{text}</S>;
    };

    renderer.image = function (href, title, text) {
      return <Image src="{href}" title="{title}" alt="{text}"/>;
    };

    return renderer;
  }

  render() {
    const styles = {
      text: {
        fontFamily: "inherit",
        fontSize: "2rem",
        fontWeight: "inherit",
        textAnchor: "middle"
      }
    };
    return <div key="marki" style={styles} ref="markdown">{this.state.tree}</div>;
  }
}

SpectacleMarkdown.propTypes = {
  source: React.PropTypes.string
};

SpectacleMarkdown.contextTypes = {
  styles: React.PropTypes.object
};

export default SpectacleMarkdown;
