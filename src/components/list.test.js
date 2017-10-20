import List from './list';
import React from 'react';
import { shallow } from 'enzyme';

describe('<List />', () => {
  it('creates an unordered list <ul> by default', () => {
    const context = { styles: { components: { list: {} } } };
    const wrapper = shallow(<List />, { context });
    expect(wrapper.name()).toBe('Styled(ul)');
  });

  it('creates an ordered list <ol> when specified', () => {
    const context = { styles: { components: { list: {} } } };
    const wrapper = shallow(<List ordered />, { context });
    expect(wrapper.name()).toBe('Styled(ol)');
  });

  it('applies contextual styles to the rendered component', () => {
    const context = { styles: { components: { list: {
      background: '#fff',
      color: '#ff0'
    } } } };
    const wrapper = shallow(<List style={{ fontWeight: 'bold' }} />, { context });
    expect(wrapper.prop('styles')).toEqual([
      context.styles.components.list,
      {},
      { fontWeight: 'bold' }
    ]);
  });
});
