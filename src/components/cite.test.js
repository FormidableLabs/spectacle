import React from 'react';
import { mount } from 'enzyme';
import Cite from './cite';

describe('<Cite />', () => {
  test('should render correctly.', () => {
    const context = { styles: { components: { cite: { color: '#ee0' } } } };
    const wrapper = mount(<Cite>Someone</Cite>, { context });
    expect(wrapper).toMatchSnapshot();
  });
});
