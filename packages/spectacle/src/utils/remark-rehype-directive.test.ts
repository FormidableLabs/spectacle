import { directiveParserPlugin } from './remark-rehype-directive';

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
