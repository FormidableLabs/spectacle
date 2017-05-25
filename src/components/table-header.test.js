import React from 'react';
import { mount } from 'enzyme';
import { mountToJson } from 'enzyme-to-json';
import TableHeader from './table-header';

describe('<TableHeader />', () => {
  test('should render correctly', () => {
    const wrapper = mount(
      <TableHeader>
        <tr><th>Table Content</th></tr>
      </TableHeader>
    );
    expect(mountToJson(wrapper)).toMatchSnapshot();
  });
});
