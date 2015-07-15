/*global window*/

import React from "react/addons";
import Base from "../src/base";
import Radium from "radium";
import marked from "./marked";
import {
  Appear, BlockQuote, Cite, CodePane, Deck, Fill,
  Heading, Image, Layout, Link, ListItem, List, Quote, Slide, Text
} from "../src/spectacle";

@Radium
class SpectacleMarkdown extends Base {
  constructor(props) {
    super(props);
    this.state = {
      tree: []
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
  };

  customRenderer() {
      var that = this;
      const renderer = new marked.Renderer();
      renderer.code = function (code, language) {
        that.state.tree.push(<pre>{code}</pre>);
      };

      renderer.blockquote = function (quote) {
        that.state.tree.pop();
        that.state.tree.push(<BlockQuote><Quote>{quote}</Quote></BlockQuote>);
      };

      // How does this happen?
      renderer.html = function (html) {
        that.state.tree.push(html);
      };

      renderer.heading = function (text, level) {
          if (!level) {
              level = 1;
          }
          that.state.tree.push(<Heading {...that.props} size={level} fit caps textColor="black">{text}</Heading>);
      };

      renderer.hr = function () {
        that.state.tree.push(<hr/>);
      };

      renderer.list = function(body, ordered) {
          var type = ordered ? 'ol' : 'ul';
          return '<' + type + '>\n' + body + '</' + type + '>\n';
      }

      renderer.listitem = function (text) {
          return <ListItem>{text}</ListItem>;
      }

      renderer.list = function (body, ordered) {
        that.state.tree.push(<List>{body}</List>);
      };

      renderer.paragraph = function (text) {
          that.state.tree.push(<Text fit textColor="black">{text}</Text>)
      }

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
          return <strong>{text}</strong>;
      };

      renderer.em = function (text) {
          return <em>{text}</em>;
      };

      renderer.codespan = function (text) {
        return <code>{text}</code>;
      };

      renderer.br = function (text) {
        return <br/>;
      };

      renderer.del = function (text) {
        return <del>{text}</del>;
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
    //return <div ref="markdown" style={[this.context.styles.components.text, this.getStyles()]} dangerouslySetInnerHTML={{__html: this.state.rawOutput}} />
    return <div ref="markdown" style={[this.context.styles.components.content, this.getStyles()]}>{this.state.tree}</div>
  }
}

SpectacleMarkdown.contextTypes = {
    styles: React.PropTypes.object
};

export default SpectacleMarkdown;
