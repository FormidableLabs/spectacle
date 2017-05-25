import Quote from './quote';
import React from 'react';
import { mount } from 'enzyme';
import { mountToJson } from 'enzyme-to-json';

describe('<Quote />', () => {
  test('should render correctly', () => {
    const context = { styles: { components: { quote: {
      color: '#ff0'
    } } } };
    const wrapper = mount(<Quote>Hello There!</Quote>, { context });
    expect(mountToJson(wrapper)).toMatchSnapshot();
  });
});
