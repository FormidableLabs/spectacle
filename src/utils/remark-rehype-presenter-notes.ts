import zone from 'mdast-zone';
import unistVisit from 'unist-util-visit';
import * as mdast from 'mdast-builder';

export default function remarkRehypePresenterNotes(noteCallback) {
  function transformZoneNote(start, nodes) {
    noteCallback(...nodes);
    return [];
  }

  function transformLineNote(node, index, parent) {
    if (node.children.length === 0) return;
    if (node.children[0].type !== 'text') return;

    const text = node.children[0];
    const match = /^Notes: (.*)$/.exec(text.value);
    if (!match) return;

    noteCallback(mdast.paragraph(mdast.text(match[1])));
    parent.children.splice(index, 1);
  }

  return tree => {
    zone(tree, 'notes', transformZoneNote);
    unistVisit(tree, 'paragraph', transformLineNote);
  };
}
