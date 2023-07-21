// @ts-ignore
import unistVisit, { Visitor } from 'unist-util-visit';
import { Literal, Node, Parent } from 'unist';
import * as mdast from 'mdast-builder';
import type { Plugin } from 'unified';
import visit from 'unist-util-visit';
import cloneDeep from 'lodash.clonedeep';

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

const cloneFn =
  typeof structuredClone !== 'undefined' ? structuredClone : cloneDeep;

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

    /**
     * If the parser finds an unknown directive, splice it out from
     * the node tree, so it doesn't render on/break the slide.
     */
    if (!directiveNodeTypes.includes(<DirectiveNodes>directiveType)) {
      parent?.children.splice(index, 1);
    } else {
      /**
       * If the parser finds a directive node, flatten it and replace
       * the raw structure with one that contains no children and the position.
       * The children will be populated with directivesHandlerPlugin to contain
       * the nodes for each grouping.
       */
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
    let slideHasDirectives = false;
    visit(tree, (node) => {
      if (isDirectiveNode(node)) {
        slideHasDirectives = true;
        const treeNodes = <TreeNode>tree;
        const clonedNode = <typeof node>cloneFn(node);

        switch (<DirectiveNodes>node.type) {
          /**
           * Get the start and end index based on the section directives in the
           * node tree. These will be used to determine which nodes belong to each
           * section. If there is no final directive, assume end of slide.
           */
          case 'sectionDirective': {
            const startIndex = treeNodes.children.indexOf(node);
            const endIndex = (() => {
              /**
               * The end index should be the next section directive found in the node
               * tree or the end of slide. Offset each visit run by the index of the
               * previous section directive index.
               */
              const proposedEndIndex =
                treeNodes.children
                  .slice(startIndex + 1)
                  .findIndex((n) => n.type === 'sectionDirective') + startIndex;
              return proposedEndIndex > startIndex
                ? proposedEndIndex
                : treeNodes.children.length - 1;
            })();

            /**
             * Collect the elements that are within the index bounds of the two
             * section directives.
             */
            const elements = treeNodes.children.slice(
              startIndex + 1,
              endIndex + 1
            );

            /**
             * Finally, assign the nodes within the bounds as children
             * to the section directive and push it to the overall tree.
             */
            (<VisitNode>clonedNode).children = [...elements];
            treeChildren.push(clonedNode);
          }
        }
      }
    });
    slideHasDirectives && ((<TreeNode>tree).children = treeChildren);
  };
};

const isDirectiveNode = <T extends Node>(
  node: T
): node is T & { name: string; attributes?: Record<string, string> } =>
  directiveNodeTypes.includes(<DirectiveNodes>node.type);
