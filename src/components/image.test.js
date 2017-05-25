import React from 'react';
import { mount } from 'enzyme';
import Image from './image';

describe('<Image />', () => {
  test('should render correctly.', () => {
    const context = { styles: { components: { image: {} } } };
    const wrapper = mount(
      <Image src="foo.png" display="inline-block" width={2560} height={1440} />,
      { context }
    );
    expect(wrapper).toMatchSnapshot();
  });
});
