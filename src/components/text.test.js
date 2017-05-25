import React from 'react';
import { mount } from 'enzyme';
import Text from './text';

describe('<Text />', () => {
  it('should render a <p> with text for the default configuration.', () => {
    const context = { styles: { components: { text: { color: '#000' } } } };
    const wrapper = mount(<Text>Spectacle!</Text>, { context });
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a <div> with text for the `fit` configuration.', () => {
    const context = { styles: { components: { text: { color: '#000' } } } };
    const wrapper = mount(<Text fit>Spectacle Full Size!</Text>, { context });
    expect(wrapper).toMatchSnapshot();
  });
});
