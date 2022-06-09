import { ReactElement } from 'react';
import { Markdown, MarkdownSlide, MarkdownSlideSet } from './markdown';
import Deck from '../deck/deck';
import { Heading, ListItem } from '../typography';
import { Appear } from '../appear';
import Slide from '../slide/slide';
import { queryByTestId, render } from '@testing-library/react';

const mountInsideDeck = (tree: ReactElement) => {
  return render(<Deck>{tree}</Deck>);
};

describe('<MarkdownSlide />', () => {
  it('should generate standard unordered lists by default', () => {
    const { getByText, queryByTestId } = mountInsideDeck(
      <MarkdownSlide>{`
        - One
        - Two
        - Three
      `}</MarkdownSlide>
    );

    expect(getByText('One')).toBeDefined();
    expect(getByText('Two')).toBeDefined();
    expect(getByText('Three')).toBeDefined();
    expect(queryByTestId('AppearElement')).toBeNull();
  });

  it('should generate animated list items with animateListItems', () => {
    const { getByText, queryAllByTestId } = mountInsideDeck(
      <MarkdownSlide animateListItems>{`
        - One
        - Two
        - Three
      `}</MarkdownSlide>
    );

    expect(getByText('One')).toBeDefined();
    expect(getByText('Two')).toBeDefined();
    expect(getByText('Three')).toBeDefined();
    expect(queryAllByTestId('AppearElement').length).toBe(3);
  });

  it('should work with raw HTML', () => {
    const { container } = mountInsideDeck(
      <MarkdownSlide>{`
        - One <div>one-div</div>
        - Two <i>two-i-1</i><i>two-i-2</i>
        - Three
      `}</MarkdownSlide>
    );

    // Assert raw HTML elements are actually present.
    expect(
      container.querySelectorAll('li')[0].querySelectorAll('div')
    ).toHaveLength(1);
    expect(
      container.querySelectorAll('li')[1].querySelectorAll('i')
    ).toHaveLength(2);
    expect(container.querySelectorAll('li')[2].children).toHaveLength(0);
  });

  it('should generate line breaks for inline paragraph elements', () => {
    const { container } = mountInsideDeck(
      <MarkdownSlide>{`
        One
        **Two**
        _Three_
        \`Four\`
        ~~Five~~
      `}</MarkdownSlide>
    );
    expect(container.querySelectorAll('br')).toHaveLength(4);
  });

  it('should generate line breaks for inline paragraph elements with carriage returns', () => {
    const { container } = mountInsideDeck(
      <MarkdownSlide>{`One\r\n**Two**\r\n_Three_\r\n\`Four\`\r\n~~Five~~`}</MarkdownSlide>
    );
    expect(container.querySelectorAll('br')).toHaveLength(4);
  });

  it('should generate line breaks for inline paragraph elements with mixed returns', () => {
    const { container } = mountInsideDeck(
      <MarkdownSlide>{`One\n**Two**\r\n_Three_\n\`Four\`\r\n~~Five~~`}</MarkdownSlide>
    );
    expect(container.querySelectorAll('br')).toHaveLength(4);
  });
});

describe('<MarkdownSlideSet />', () => {
  it('should generate standard unordered lists by default', () => {
    const { container, queryAllByTestId } = mountInsideDeck(
      <MarkdownSlideSet>{`
        - One
        - Two
        - Three

        ---

        - Four
        - Five
        - Size
      `}</MarkdownSlideSet>
    );

    expect(container.querySelectorAll('ul')).toHaveLength(2);
    expect(container.querySelectorAll('li')).toHaveLength(6);
    expect(queryAllByTestId('AppearElement')).toHaveLength(0);
  });

  it('should generate animated list items with animateListItems', () => {
    const { container, queryAllByTestId } = mountInsideDeck(
      <MarkdownSlideSet animateListItems>{`
        - One
        - Two
        - Three

        ---

        - Four
        - Five
        - Size
      `}</MarkdownSlideSet>
    );

    expect(container.querySelectorAll('ul')).toHaveLength(2);
    expect(queryAllByTestId('AppearElement')).toHaveLength(6);
  });

  it('Markdown should pass componentProps down to constituent components', () => {
    const { container, queryByText } = mountInsideDeck(
      <Slide>
        <Heading>Im not styled...</Heading>
        <Markdown componentProps={{ color: 'purple' }}>{`
        # Whats up world, Im styled.

        - List item
        - And another one
      `}</Markdown>
      </Slide>
    );

    expect(queryByText('Im not styled...')).not.toHaveStyle({
      color: 'purple'
    });
    expect(queryByText('Whats up world, Im styled.')).toHaveStyle({
      color: 'purple'
    });
    expect(queryByText('List item')).toHaveStyle({
      color: 'purple'
    });
  });

  it('MarkdownSlide should pass componentProps down to constituent components', () => {
    const { getByText } = mountInsideDeck(
      <MarkdownSlide componentProps={{ color: 'purple' }}>{`
        # Whats up world, Im styled.
      `}</MarkdownSlide>
    );

    expect(getByText('Whats up world, Im styled.')).toHaveStyle({
      color: 'purple'
    });
  });

  it('MarkdownSlideSet should pass componentProps down to constituent components', () => {
    const { getByText } = mountInsideDeck(
      <MarkdownSlideSet componentProps={{ color: 'purple' }}>{`
        # Whats up world, Im styled.

        ---

        # Another slide
      `}</MarkdownSlideSet>
    );

    expect(getByText('Whats up world, Im styled.')).toHaveStyle({
      color: 'purple'
    });

    expect(getByText('Another slide')).toHaveStyle({ color: 'purple' });
  });
});
