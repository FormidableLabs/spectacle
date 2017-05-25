import React from 'react';
import { mount } from 'enzyme';
import { mountToJson } from 'enzyme-to-json';
import TableBody from './table-header';

describe('<TableBody />', () => {
  test('should render correctly', () => {
    const wrapper = mount(
      <TableBody>
        <tr><td>Table Content</td></tr>
      </TableBody>
    );
    expect(mountToJson(wrapper)).toMatchSnapshot();
  });
});
