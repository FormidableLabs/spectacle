import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Deck from './index';
import Slide from '../slide';

Enzyme.configure({ adapter: new Adapter() });

describe('<Deck />', () => {
  it('should have the correct number of children and ignore invalid children', () => {
    const tree = mount(
      <Deck>
        <Slide>
          <div>Slide 1</div>
        </Slide>
        <Slide>
          <div>Slide 2</div>
        </Slide>
        <div>This is an invalid child</div>
      </Deck>
    );
    expect(tree.find('Slide').props().numberOfSlides).toBe(2);
  });

  it('should have the default transition when none is provided as a prop', () => {
    const tree = mount(
      <Deck>
        <Slide>
          <div>Slide 1</div>
        </Slide>
      </Deck>
    );
    expect(tree.find('AnimatedDeckDiv').props().style).toHaveProperty(
      'transform'
    );
    expect(tree.find('AnimatedDeckDiv').props().style).not.toHaveProperty(
      'opacity'
    );
  });

  it('should pass the transition effect to children slides', () => {
    const tree = mount(
      <Deck transitionEffect="fade">
        <Slide>
          <div>Slide 1</div>
        </Slide>
      </Deck>
    );
    expect(tree.find('AnimatedDeckDiv').props().style).toHaveProperty(
      'opacity'
    );
    expect(tree.find('AnimatedDeckDiv').props().style).not.toHaveProperty(
      'transform'
    );
  });

  it('should give precedence to the slide prop over the deck.', () => {
    const tree = mount(
      <Deck transitionEffect="fade">
        <Slide transitionEffect="slide">
          <div>Slide 1</div>
        </Slide>
      </Deck>
    );
    expect(tree.find('AnimatedDeckDiv').props().style).not.toHaveProperty(
      'opacity'
    );
    expect(tree.find('AnimatedDeckDiv').props().style).toHaveProperty(
      'transform'
    );
  });

  it('should have no transition when the none prop is provided.', () => {
    const tree = mount(
      <Deck transitionEffect="none">
        <Slide>
          <div>Slide 1</div>
        </Slide>
      </Deck>
    );
    expect(tree.find('AnimatedDeckDiv').props().style).not.toHaveProperty(
      'opacity'
    );
    expect(tree.find('AnimatedDeckDiv').props().style).not.toHaveProperty(
      'transform'
    );
  });

  it('should pass a custom transition to the slide', () => {
    const tree = mount(
      <Deck
        transitionEffect={{
          from: { color: 'red' },
          enter: { color: 'blue' },
          leave: { color: 'white' }
        }}
      >
        <Slide>
          <div>Slide 1</div>
        </Slide>
      </Deck>
    );
    expect(tree.find('AnimatedDeckDiv').props().style).toHaveProperty('color');
    expect(tree.find('AnimatedDeckDiv').props().style).not.toHaveProperty(
      'transform'
    );
    expect(tree.find('AnimatedDeckDiv').props().style).not.toHaveProperty(
      'opacity'
    );
  });
});
