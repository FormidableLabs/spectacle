import React from 'react';
import { mount } from 'enzyme';
import Table from './table';

describe('<Table />', () => {
  test('should render correctly', () => {
    const context = { styles: { components: { table: {} } } };
    const wrapper = mount(
      <Table>
        <tbody><tr><td>Table Content</td></tr></tbody>
      </Table>,
      { context }
    );
    expect(wrapper).toMatchSnapshot();
  });
});
