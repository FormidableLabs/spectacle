import React from 'react';
import { mount } from 'enzyme';
import { mountToJson } from 'enzyme-to-json';
import Cite from './cite';

describe('<Cite />', () => {
  test('should render correctly.', () => {
    const context = { styles: { components: { cite: { color: '#ee0' } } } };
    const wrapper = mount(<Cite>Someone</Cite>, { context });
    expect(mountToJson(wrapper)).toMatchSnapshot();
  });
});
