import React from 'react';
import { mount } from 'enzyme';
import { mountToJson } from 'enzyme-to-json';
import Link from './link';

describe('<Link />', () => {
  test('should render correctly', () => {
    const context = { styles: { components: { link: { color: '#345' } } } };
    const wrapper = mount((
      <Link
        href="https://www.formidable.com"
        target="_blank"
      >
        Formidable Labs
      </Link>
    ), { context });
    expect(mountToJson(wrapper)).toMatchSnapshot();
  });
});
