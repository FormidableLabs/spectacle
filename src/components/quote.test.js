import Quote from './quote';
import React from 'react';
import { mount } from 'enzyme';

describe('<Quote />', () => {
  test('should render correctly', () => {
    const context = {
      styles: {
        components: {
          quote: {
            color: '#ff0',
          },
        },
      },
    };
    const wrapper = mount(<Quote>Hello There!</Quote>, { context });
    expect(wrapper).toMatchSnapshot();
  });
});
