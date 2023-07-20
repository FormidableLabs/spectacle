import {
  directiveParserPlugin,
  directivesHandlerPlugin
} from './remark-rehype-directive';

describe('directiveParserPlugin', () => {
  it('should transform line directives', () => {
    const tree = {
      type: 'root',
      children: [
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              value: '::section'
            }
          ],
          position: undefined
        }
      ],
      position: undefined
    };

    const plugin = directiveParserPlugin();
    plugin(tree);

    expect(tree).toEqual({
      type: 'root',
      children: [
        {
          type: 'sectionDirective',
          children: [],
          position: undefined
        }
      ],
      position: undefined
    });
  });
});

describe('directivesHandlerPlugin', () => {
  it('should handle sectionDirective correctly', () => {
    const tree = {
      type: 'root',
      children: [
        { type: 'sectionDirective' },
        { type: 'text', value: 'Some other node' },
        { type: 'text', value: 'Some other node 2' },
        { type: 'sectionDirective' },
        { type: 'text', value: 'Some other node 3' },
        { type: 'text', value: 'Some other node 4' }
      ]
    };

    (directivesHandlerPlugin as any)()(tree);

    expect(tree.children).toEqual([
      {
        children: [
          { type: 'text', value: 'Some other node' },
          { type: 'text', value: 'Some other node 2' }
        ],
        type: 'sectionDirective'
      },
      {
        children: [
          { type: 'text', value: 'Some other node 3' },
          { type: 'text', value: 'Some other node 4' }
        ],
        type: 'sectionDirective'
      }
    ]);
  });
});
