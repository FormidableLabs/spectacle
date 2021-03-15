import React from 'react';
import Enzyme, { mount } from 'enzyme';
import { MarkdownSlide, MarkdownSlideSet } from './markdown';
import Adapter from 'enzyme-adapter-react-16';
import Deck from '../deck/deck';
import { ListItem } from '../typography';
import Appear from '../appear';

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
});
