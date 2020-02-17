import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { ThemeProvider } from 'styled-components';

import Appear from './appear';
import defaultTheme from '../theme/default-theme';

Enzyme.configure({ adapter: new Adapter() });

const mockedUseContext = (React.useContext = jest.fn());

const children = [
  <Appear elementNum={0} key={0}>
    <div className="child1">Content 1</div>
  </Appear>,
  <Appear elementNum={1} key={1}>
    <div className="child2">Content 2</div>
  </Appear>,
  <Appear elementNum={2} key={2}>
    <div className="child3">Content 3</div>
  </Appear>
];

describe('Appear', () => {
  let component;

  const getStyleProps = childSelector =>
    component
      .find(childSelector)
      .parent()
      .prop('style');

  it('Initially renders children invisible', () => {
    mockedUseContext.mockReturnValue({
      state: {
        currentNotes: '',
        currentSlide: 0,
        currentSlideElement: 0,
        immediate: true
      }
    });
    component = mount(
      <ThemeProvider theme={defaultTheme}>
        <>{children}</>
      </ThemeProvider>
    );

    expect(getStyleProps('.child1')).toHaveProperty('opacity', 0);
  });
  it('Renders the children in order', () => {
    mockedUseContext.mockReturnValue({
      state: {
        currentNotes: '',
        currentSlide: 0,
        currentSlideElement: 1,
        immediate: true
      }
    });
    component = mount(
      <ThemeProvider theme={defaultTheme}>
        <>{children}</>
      </ThemeProvider>
    );

    expect(getStyleProps('.child1')).toHaveProperty('opacity', 1);
    expect(getStyleProps('.child2')).toHaveProperty('opacity', 0);
  });
});
