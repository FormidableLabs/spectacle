import React from 'react';
import { mount } from 'enzyme';
import BlockQuote from './block-quote';

describe('<BlockQuote />', () => {
  test('should render correctly.', () => {
    const context = {
      styles: { components: { blockquote: { fontStyle: 'oblique' } } },
    };
    const wrapper = mount(<BlockQuote>Some Quote</BlockQuote>, { context });
    expect(wrapper).toMatchSnapshot();
  });
});
