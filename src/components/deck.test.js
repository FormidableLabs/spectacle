import React from 'react';
import { mount } from 'enzyme';
import Deck, { defaultOnStateChange } from './deck';
import Slide from './slide';
import Text from './text';

describe('<Deck />', () => {
  let wrapper;

  afterEach(() => {
    if (wrapper && wrapper.unmount) {
      wrapper.unmount();
      wrapper = null;
    }
  });

  test('should call onStateChange prop, with <Slide />s state prop', () => {
    const onStateChangeSpy = jest.fn();

    wrapper = mount(
      <Deck onStateChange={onStateChangeSpy}>
        <Slide state="slide-1">
          <Text>Test slide</Text>
        </Slide>
        <Slide state="slide-2">
          <Text>Test slide</Text>
        </Slide>
      </Deck>
    );

    expect(onStateChangeSpy).toHaveBeenCalledTimes(1);
    expect(onStateChangeSpy).lastCalledWith(
      undefined, // previous state
      'slide-1' // next state
    );
  });

  test('should call onStateChange prop, with previous state and <Slide />s state prop as the next state', () => {
    const onStateChangeSpy = jest.fn();

    wrapper = mount(
      <Deck onStateChange={onStateChangeSpy}>
        <Slide state="slide-1">
          <Text>Test slide</Text>
        </Slide>
        <Slide state="slide-2">
          <Text>Test slide</Text>
        </Slide>
      </Deck>
    );

    expect(onStateChangeSpy).lastCalledWith(
      undefined, // previous state
      'slide-1' // next state
    );

    // Go to the next slide
    wrapper.find('[aria-label="Next slide"]').simulate('click');

    expect(onStateChangeSpy).toHaveBeenCalledTimes(2);
    expect(onStateChangeSpy).lastCalledWith(
      'slide-1', // previous state
      'slide-2' // next state
    );
  });

  test('default onStateChange implementation adds the current state as a class to the document root', () => {
    defaultOnStateChange(undefined, 'slide-1');
    expect(document.documentElement.classList.contains('slide-1')).toBe(true);

    defaultOnStateChange('slide-1', 'slide-2');
    expect(document.documentElement.classList.contains('slide-1')).toBe(false);
    expect(document.documentElement.classList.contains('slide-2')).toBe(true);
  });
});
