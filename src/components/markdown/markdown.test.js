import React from 'react';
import Enzyme, { mount } from 'enzyme';
import { Markdown, MarkdownSlide, MarkdownSlideSet } from './markdown';
import Adapter from 'enzyme-adapter-react-16';
import Deck from '../deck/deck';
import { Heading, ListItem } from '../typography';
import Appear from '../appear';
import Slide from '../slide/slide';

Enzyme.configure({ adapter: new Adapter() });

const mountInsideDeck = tree => {
  return mount(<Deck>{tree}</Deck>);
};

describe('<MarkdownSlide />', () => {
  it('should generate standard unordered lists by default', () => {
    const wrapper = mountInsideDeck(
      <MarkdownSlide>{`
        - One
        - Two
        - Three
      `}</MarkdownSlide>
    );

    expect(wrapper.find('ul')).toHaveLength(1);
    expect(wrapper.find(ListItem)).toHaveLength(3);
    expect(wrapper.find(Appear)).toHaveLength(0);
  });

  it('should generate animated list items with animateListItems', () => {
    const wrapper = mountInsideDeck(
      <MarkdownSlide animateListItems>{`
        - One
        - Two
        - Three
      `}</MarkdownSlide>
    );

    expect(wrapper.find('ul')).toHaveLength(1);
    expect(wrapper.find(Appear)).toHaveLength(3);
  });

  it('should work with raw HTML', () => {
    const wrapper = mountInsideDeck(
      <MarkdownSlide>{`
        - One <div>one-div</div>
        - Two <i>two-i-1</i><i>two-i-2</i>
        - Three
      `}</MarkdownSlide>
    );

    // Assert raw HTML elements are actually present.
    expect(
      wrapper
        .find('li')
        .at(0)
        .children()
        .find('div')
    ).toHaveLength(1);
    expect(
      wrapper
        .find('li')
        .at(1)
        .children()
        .find('i')
    ).toHaveLength(2);
    expect(
      wrapper
        .find('li')
        .at(2)
        .children()
    ).toHaveLength(1);
  });
});

describe('<MarkdownSlideSet />', () => {
  it('should generate standard unordered lists by default', () => {
    const wrapper = mountInsideDeck(
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

    expect(wrapper.find('ul')).toHaveLength(2);
    expect(wrapper.find(ListItem)).toHaveLength(6);
    expect(wrapper.find(Appear)).toHaveLength(0);
  });

  it('should generate animated list items with animateListItems', () => {
    const wrapper = mountInsideDeck(
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

    expect(wrapper.find('ul')).toHaveLength(2);
    expect(wrapper.find(Appear)).toHaveLength(6);
  });

  it('Markdown should pass componentProps down to constituent components', () => {
    const wrapper = mountInsideDeck(
      <Slide>
        <Heading>Im not styled...</Heading>
        <Markdown componentProps={{ color: 'purple' }}>{`
        # What's up world, I'm styled.

        - List item
        - And another one
      `}</Markdown>
      </Slide>
    );

    expect(
      wrapper
        .find(Heading)
        .at(0)
        .prop('color')
    ).not.toBe('purple');

    expect(
      wrapper
        .find(Heading)
        .at(1)
        .prop('color')
    ).toBe('purple');

    expect(
      wrapper
        .find(ListItem)
        .at(0)
        .prop('color')
    ).toBe('purple');
  });

  it('MarkdownSlide should pass componentProps down to constituent components', () => {
    const wrapper = mountInsideDeck(
      <MarkdownSlide componentProps={{ color: 'purple' }}>{`
        # What's up world, I'm styled.
      `}</MarkdownSlide>
    );

    expect(
      wrapper
        .find(Heading)
        .at(0)
        .prop('color')
    ).toBe('purple');
  });

  it('MarkdownSlideSet should pass componentProps down to constituent components', () => {
    const wrapper = mountInsideDeck(
      <MarkdownSlideSet componentProps={{ color: 'purple' }}>{`
        # What's up world, I'm styled.

        ---

        # Another slide
      `}</MarkdownSlideSet>
    );

    expect(
      wrapper
        .find(Heading)
        .at(0)
        .prop('color')
    ).toBe('purple');

    expect(
      wrapper
        .find(Heading)
        .at(1)
        .prop('color')
    ).toBe('purple');
  });
});
