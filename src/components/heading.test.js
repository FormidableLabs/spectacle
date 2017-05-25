import React from 'react';
import { mount } from 'enzyme';
import Heading from './heading';

describe('<Heading />', () => {
  test('should render correctly.', () => {
    const context = {
      styles: {
        components: {
          heading: {
            h2: {
              color: '#ff0',
            },
          },
        },
      },
    };
    const wrapper = mount(<Heading size={2}>Hi There!</Heading>, { context });
    expect(wrapper).toMatchSnapshot();
  });

  test('should render the fit configuration correctly.', () => {
    const context = { styles: { components: { heading: {} } } };
    const wrapper = mount(<Heading fit>This Header Fits!</Heading>, {
      context,
    });
    expect(wrapper).toMatchSnapshot();
  });
});
