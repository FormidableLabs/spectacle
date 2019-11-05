import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as history from 'history';

import useUrlRouting from './use-url-routing';

Enzyme.configure({ adapter: new Adapter() });

describe('useUrlRouting', () => {
  const pushMock = jest.fn();

  history.createBrowserHistory = () => ({
    push: pushMock,
    listen: jest.fn(),
    replace: jest.fn()
  });
  describe('navigateToNext', () => {
    it('navigates to next slideElement when navigateToNext is called', () => {
      const options = {
        dispatch: jest.fn(),
        slideElementMap: { 0: 2, 1: 0, 2: 0, 3: 0 },
        currentSlide: 0,
        currentSlideElement: 0,
        currentPresenterMode: false,
        currentOverviewMode: false,
        currentExportMode: false,
        currentPrintMode: false,
        loop: false,
        animationsWhenGoingBack: false,
        onUrlChange: jest.fn()
      };
      const TestComponent = () => {
        const { navigateToNext } = useUrlRouting(options);
        return (
          <>
            <button
              data-testid="navigate to next button"
              onClick={() => navigateToNext()}
            ></button>
          </>
        );
      };
      const component = mount(<TestComponent />);
      component
        .find('[data-testid="navigate to next button"]')
        .simulate('click');
      expect(pushMock).toBeCalledWith('?slide=0&slideElement=1');
    });
    it('navigates to next slide when navigateToNext is called and no slideElements', () => {
      const options = {
        dispatch: jest.fn(),
        slideElementMap: { 0: 0, 1: 0, 2: 0, 3: 0 },
        currentSlide: 0,
        currentSlideElement: 0,
        currentPresenterMode: false,
        currentOverviewMode: false,
        currentExportMode: false,
        currentPrintMode: false,
        loop: false,
        animationsWhenGoingBack: false,
        onUrlChange: jest.fn()
      };
      const TestComponent = () => {
        const { navigateToNext } = useUrlRouting(options);
        return (
          <>
            <button
              data-testid="navigate to next button"
              onClick={() => navigateToNext()}
            ></button>
          </>
        );
      };
      const component = mount(<TestComponent />);
      component
        .find('[data-testid="navigate to next button"]')
        .simulate('click');
      expect(pushMock).toBeCalledWith('?slide=1&slideElement=-1');
    });
    it('url doesnt change when navigateToNext is called and no slideElements or slides left', () => {
      const options = {
        dispatch: jest.fn(),
        slideElementMap: { 0: 0 },
        currentSlide: 0,
        currentSlideElement: 0,
        currentPresenterMode: false,
        currentOverviewMode: false,
        currentExportMode: false,
        currentPrintMode: false,
        loop: false,
        animationsWhenGoingBack: false,
        onUrlChange: jest.fn()
      };
      const TestComponent = () => {
        const { navigateToNext } = useUrlRouting(options);
        return (
          <>
            <button
              data-testid="navigate to next button"
              onClick={() => navigateToNext()}
            ></button>
          </>
        );
      };
      const component = mount(<TestComponent />);
      component
        .find('[data-testid="navigate to next button"]')
        .simulate('click');
      expect(pushMock).not.toBeCalled();
    });
    it('if loop === true then when navigateToNext is called and no slideElements or slides left it goes to first slide', () => {
      const options = {
        dispatch: jest.fn(),
        slideElementMap: { 0: 0, 1: 0 },
        currentSlide: 1,
        currentSlideElement: 0,
        currentPresenterMode: false,
        currentOverviewMode: false,
        currentExportMode: false,
        currentPrintMode: false,
        loop: true,
        animationsWhenGoingBack: false,
        onUrlChange: jest.fn()
      };
      const TestComponent = () => {
        const { navigateToNext } = useUrlRouting(options);
        return (
          <>
            <button
              data-testid="navigate to next button"
              onClick={() => navigateToNext()}
            ></button>
          </>
        );
      };
      const component = mount(<TestComponent />);
      component
        .find('[data-testid="navigate to next button"]')
        .simulate('click');
      expect(pushMock).toBeCalledWith('?slide=0&slideElement=-1');
    });
  });
});
