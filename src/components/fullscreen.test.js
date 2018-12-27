import React from 'react';
import { mount } from 'enzyme';
import Fullscreen from './fullscreen';

describe('<Fullscreen />', () => {
  test('should render correctly.', () => {
    const context = { styles: { styles: { fullscreen: {} } } };
    const wrapper = mount(<Fullscreen />, { context });
    expect(wrapper).toMatchSnapshot();
  });

  test('should toggle fullscreen when the button is selected.', () => {
    const context = { styles: { styles: { fullscreen: {} } } };
    const onClickStub = jest.fn();
    const wrapper = mount(<Fullscreen onClick={onClickStub} />, { context });

    wrapper
      .find('button')
      .first()
      .simulate('click');

    expect(onClickStub).toHaveBeenCalledTimes(1);
  });
});
