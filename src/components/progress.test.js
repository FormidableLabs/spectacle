import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { ThemeProvider } from 'styled-components';

import { DeckContext } from '../hooks/use-deck';
import defaultTheme from '../theme/default-theme';
import Progress, { Circle } from './progress';

Enzyme.configure({ adapter: new Adapter() });

const mountWithContext = (tree, context) => {
  const WrappingThemeProvider = props => (
    <DeckContext.Provider
      value={{
        ...context,
        goToSlide: jest.fn()
      }}
    >
      <ThemeProvider theme={defaultTheme}>{props.children}</ThemeProvider>
    </DeckContext.Provider>
  );
  return mount(tree, { wrappingComponent: WrappingThemeProvider });
};

describe('<Progress />', () => {
  it('should render the circles at the specified size and color', () => {
    const wrapper = mountWithContext(<Progress size={20} color="#ff0" />, {
      numberOfSlides: 5,
      state: {
        currentSlide: 0
      }
    });
    expect(wrapper).toMatchSnapshot();
  });

  it('should render the right amount of circles', () => {
    const wrapper = mountWithContext(<Progress />, {
      numberOfSlides: 5,
      state: {
        currentSlide: 0
      }
    });
    expect(wrapper.find(Circle).length).toBe(5);
  });

  it('should render the right amount of circles with the current circle in the active state', () => {
    const wrapper = mountWithContext(<Progress />, {
      numberOfSlides: 5,
      state: {
        currentSlide: 4
      }
    });
    expect(
      wrapper
        .find(Circle)
        .at(4)
        .prop('active')
    ).toBe(true);
  });
});
