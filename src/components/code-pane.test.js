import React from 'react';
import { shallow } from 'enzyme';
import CodePane from './code-pane';

describe('<CodePane />', () => {
  test('should render correctly.', () => {
    const context = {
      styles: {
        components: { codePane: {}, syntax: {} },
        prism: { light: 'light;', dark: 'dark;' }
      }
    };
    const source = `
      const myButton = (
        <CustomButton
          style={{ background: '#f00' }}
          onClick={this.action}
        >
         Click Me
        </CustomButton>
      );
    `;
    const wrapper = shallow(<CodePane lang="jsx" source={source} />, {
      context
    });
    expect(wrapper).toMatchSnapshot();
  });
});
