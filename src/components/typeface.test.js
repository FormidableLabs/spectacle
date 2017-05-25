import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { mount } from 'enzyme';
import Typeface from './typeface';

class MockComponent extends Component {
  static propTypes = {
    children: PropTypes.node,
  };

  static contextTypes = {
    typeface: PropTypes.object,
  };

  render() {
    return (
      <div style={this.context.typeface}>
        {this.props.children}
      </div>
    );
  }
}

describe('<Typeface />', () => {
  test('should render the children when using a system font.', () => {
    const wrapper = mount(
      <Typeface font="SF UI Text" weight={400}>
        <MockComponent>Hello!</MockComponent>
      </Typeface>
    );
    expect(wrapper).toMatchSnapshot();
  });

  test('should render the children when using a Google font.', () => {
    const wrapper = mount(
      <Typeface googleFont="Roboto Slab" weight={700} italic>
        <MockComponent>Hello!</MockComponent>
      </Typeface>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
