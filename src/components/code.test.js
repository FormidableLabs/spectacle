import React from 'react';
import { mount } from 'enzyme';
import Code from './code';

describe('<Code />', () => {
  test('should render correctly.', () => {
    const context = { styles: { components: { code: { fontWeight: 500 } } } };
    const wrapper = mount(<Code>const [a, ...b] = [1, 2, 3, 4]</Code>, {
      context,
    });
    expect(wrapper).toMatchSnapshot();
  });
});
