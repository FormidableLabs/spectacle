import React from 'react';
import { mount } from 'enzyme';
import TableBody from './table-header';

describe('<TableBody />', () => {
  test('should render correctly', () => {
    const wrapper = mount(
      <TableBody>
        <tr><td>Table Content</td></tr>
      </TableBody>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
