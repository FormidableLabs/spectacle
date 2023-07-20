// @ts-ignore
import unistVisit, { Visitor } from 'unist-util-visit';
import { Literal, Node, Parent } from 'unist';
import * as mdast from 'mdast-builder';
import type { Plugin } from 'unified';
import visit from 'unist-util-visit';

export const directiveParserPlugin = () => {
  const transformLineDirective: Visitor<Parent> = (node, index, parent) => {
    if (node.children.length === 0) return;
    if (node.children[0].type !== 'text') return;
    const text = node.children[0] as Literal;
    const match = /^::(.*)$/.exec(text.value as string);
    if (!match) return;
    const matchedNode = mdast.paragraph(mdast.text(match[1]));
    matchedNode.type = 'directiveRoot';
    for (const n of matchedNode.children) n.type = 'directive';
    parent!.children.splice(index, 1, matchedNode);
  };

  return (tree: Node) => {
    unistVisit(tree, 'paragraph', transformLineDirective);
  };
};

export const directivesHandlerPlugin: Plugin = () => {
  return (tree) => {
    visit(tree, (node) => {
      console.log(node);
    });
  };
};
