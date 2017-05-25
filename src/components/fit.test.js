import React from 'react';
import { mount } from 'enzyme';
import { Fit } from './fit';

describe('<Fit />', () => {
  test('should render with style `flex: 0`', () => {
    const wrapper = mount(<Fit>Hello</Fit>);
    expect(wrapper).toMatchSnapshot();
  });
});
