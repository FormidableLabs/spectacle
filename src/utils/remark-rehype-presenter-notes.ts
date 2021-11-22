// @ts-ignore
import zone from 'mdast-zone';
import unistVisit, { Visitor } from 'unist-util-visit';
import * as mdast from 'mdast-builder';

import type { Node, Parent, Literal } from 'unist';

export default function remarkRehypePresenterNotes(
  noteCallback: (...nodes: Node[]) => void
) {
  const transformZoneNote = (start: unknown, nodes: Node[]) => {
    noteCallback(...nodes);
    return [];
  };

  const transformLineNote: Visitor<Parent> = (node, index, parent) => {
    if (node.children.length === 0) return;
    if (node.children[0].type !== 'text') return;

    const text = node.children[0] as Literal;
    const match = /^Notes: (.*)$/.exec(text.value as string);
    if (!match) return;

    noteCallback(mdast.paragraph(mdast.text(match[1])) as Node);
    parent!.children.splice(index, 1);
  };

  return (tree: Node) => {
    zone(tree, 'notes', transformZoneNote);
    unistVisit(tree, 'paragraph', transformLineNote);
  };
}
