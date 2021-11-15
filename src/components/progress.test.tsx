/* eslint-disable react/prop-types */
import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { ThemeProvider } from 'styled-components';

import { DeckContext } from './deck/deck';
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
  it('should render the right amount of circles', () => {
    const wrapper = mountWithContext(<Progress />, {
      slideCount: 5,
      activeView: {
        slideIndex: 0
      }
    });
    expect(wrapper.find(Circle).length).toBe(5);
  });

  it('should render the right amount of circles with the current circle in the active state', () => {
    const wrapper = mountWithContext(<Progress />, {
      slideCount: 5,
      activeView: {
        slideIndex: 4
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
