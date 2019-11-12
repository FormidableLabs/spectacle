import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { ThemeProvider } from 'styled-components';

import PresenterDeck from './presenter-deck';
import defaultTheme from '../../theme/default-theme';

Enzyme.configure({ adapter: new Adapter() });

const mockedUseContext = (React.useContext = jest.fn());

const children = [
  <div className="slide1" key="0">
    Slide 1
  </div>,
  <div className="slide2" key="1">
    Slide 2
  </div>,
  <div className="slide3" key="2">
    Slide 3
  </div>
];

describe('PresenterDeck', () => {
  beforeEach(() =>
    mockedUseContext.mockReturnValue({
      state: {
        currentNotes: '',
        currentSlide: 0,
        currentSlideElement: 0,
        immediate: false
      }
    })
  );
  it('Renders correct slides', () => {
    const props = {
      isController: true,
      isReceiver: false,
      startConnection: jest.fn(),
      terminateConnection: jest.fn()
    };
    const component = mount(
      <ThemeProvider theme={defaultTheme}>
        <PresenterDeck {...props}>{children}</PresenterDeck>
      </ThemeProvider>
    );
    expect(mockedUseContext).toHaveBeenCalled();
    expect(component.find('.slide1').length).toBe(1);
    expect(component.find('.slide2').length).toBe(1);
    expect(component.find('.slide3').length).toBe(0);
  });
  it('Doesnt render a next slide if (currentSlide + 1) > slides.length ', () => {
    const props = {
      isController: true,
      isReceiver: false,
      startConnection: jest.fn(),
      terminateConnection: jest.fn()
    };
    mockedUseContext.mockReturnValue({
      state: {
        currentNotes: '',
        currentSlide: 2,
        currentSlideElement: 0,
        immediate: false
      }
    });
    const component = mount(
      <ThemeProvider theme={defaultTheme}>
        <PresenterDeck {...props}>{children}</PresenterDeck>
      </ThemeProvider>
    );
    expect(
      component
        .find('[data-testid="Next Slide"]')
        .children()
        .find('.slide3').length
    ).toBe(0);
  });
  it('Begins connection when button is clicked', () => {
    const props = {
      isController: false,
      isReceiver: false,
      startConnection: jest.fn(),
      terminateConnection: jest.fn()
    };
    const component = mount(
      <ThemeProvider theme={defaultTheme}>
        <PresenterDeck {...props}>{children}</PresenterDeck>
      </ThemeProvider>
    );
    component
      .find('[data-testid="Start Connection"]')
      .first()
      .simulate('click');
    expect(props.startConnection).toHaveBeenCalledWith(
      'slide=0&slideElement=0'
    );
  });
  it('Cancels connection when button is clicked', () => {
    const props = {
      isController: true,
      isReceiver: false,
      startConnection: jest.fn(),
      terminateConnection: jest.fn()
    };
    const component = mount(
      <ThemeProvider theme={defaultTheme}>
        <PresenterDeck {...props}>{children}</PresenterDeck>
      </ThemeProvider>
    );
    component
      .find('[data-testid="Close Connection"]')
      .first()
      .simulate('click');
    expect(props.terminateConnection).toHaveBeenCalled();
  });
});
