import Markdown from './markdown';
import React from 'react';
import { shallow } from 'enzyme';

describe('<Markdown>', () => {
  test('should render correctly when using inline code', () => {
    const wrapper = shallow(
      <Markdown>This should `work`</Markdown>
    );

    expect(wrapper).toMatchSnapshot();
  });
});
