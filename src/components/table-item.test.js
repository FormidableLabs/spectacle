import React from 'react';
import { mount } from 'enzyme';
import TableItem from './table-item';

describe('<TableItem />', () => {
  test('should render correctly', () => {
    const context = {
      styles: {
        components: {
          tableItem: {
            color: '#444',
          },
        },
      },
    };
    const wrapper = mount(<TableItem>Table Item Content</TableItem>, {
      context,
    });
    expect(wrapper).toMatchSnapshot();
  });
});
