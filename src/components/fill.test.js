import React from 'react';
import { mount } from 'enzyme';
import { Fill } from './fill';

describe('<Fill />', () => {
  test('should render with style `flex: 1`', () => {
    const wrapper = mount(<Fill>Spectacle</Fill>);
    expect(wrapper).toMatchSnapshot();
  });
});
