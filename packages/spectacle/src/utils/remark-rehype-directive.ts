// @ts-ignore
import unistVisit, { Visitor } from 'unist-util-visit';
import { Literal, Node, Parent } from 'unist';
import * as mdast from 'mdast-builder';
import type { Plugin } from 'unified';
import visit from 'unist-util-visit';

const directiveNodeTypes = ['sectionDirective'] as const;
export const directiveMatch = /^::(.*)$/;

type DirectiveNodes = typeof directiveNodeTypes[number];
type ValueNode = Node & { value: string; children?: unknown[] };
type VisitNode = Node & {
  name: string;
  attributes?: Record<string, string> | undefined;
  children?: unknown[];
};
type TreeNode = Node & { children: Node[] };

export const directiveParserPlugin = () => {
  const transformLineDirective: Visitor<Parent> = (node, index, parent) => {
    if (node.children.length === 0) return;
    if (node.children[0].type !== 'text') return;

    const text = <Literal>node.children[0];
    const match = directiveMatch.exec(<string>text.value);
    if (!match) return;

    const matchedNode = mdast.paragraph(mdast.text(match[1]));
    const directiveType = `${
      (<ValueNode>matchedNode.children[0]).value
    }Directive`;

    if (!directiveNodeTypes.includes(<DirectiveNodes>directiveType)) {
      parent?.children.splice(index, 1);
    } else {
      const directiveNode = {
        type: directiveType,
        children: [],
        position: node.position
      };
      parent?.children.splice(index, 1, directiveNode);
    }
  };

  return (tree: Node) => {
    unistVisit(tree, 'paragraph', transformLineDirective);
  };
};

export const directivesHandlerPlugin: Plugin = () => {
  return (tree) => {
    const treeChildren: Node[] = [];
    visit(tree, (node) => {
      if (isDirectiveNode(node)) {
        const treeNodes = <TreeNode>tree;
        const clonedNode = <typeof node>structuredClone(node);

        switch (<DirectiveNodes>node.type) {
          case 'sectionDirective': {
            const startIndex = treeNodes.children.indexOf(node);
            const endIndex = (() => {
              const proposedEndIndex =
                treeNodes.children
                  .slice(startIndex + 1)
                  .findIndex((n) => n.type === 'sectionDirective') + startIndex;
              return proposedEndIndex > startIndex
                ? proposedEndIndex
                : treeNodes.children.length - 1;
            })();

            const elements = treeNodes.children.slice(
              startIndex + 1,
              endIndex + 1
            );

            (<VisitNode>clonedNode).children = [...elements];
            treeChildren.push(clonedNode);
          }
        }
      }
    });
    (<TreeNode>tree).children = treeChildren;
  };
};

const isDirectiveNode = <T extends Node>(
  node: T
): node is T & { name: string; attributes?: Record<string, string> } =>
  directiveNodeTypes.includes(<DirectiveNodes>node.type);
