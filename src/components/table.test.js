import React from 'react';
import { mount } from 'enzyme';
import { mountToJson } from 'enzyme-to-json';
import Table from './table';

describe('<Table />', () => {
  test('should render correctly', () => {
    const context = { styles: { components: { table: {} } } };
    const wrapper = mount((
      <Table>
        <tbody><tr><td>Table Content</td></tr></tbody>
      </Table>
    ), { context });
    expect(mountToJson(wrapper)).toMatchSnapshot();
  });
});
