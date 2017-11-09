import React from 'react';
import { render, shallow } from 'enzyme';
import ComponentPlayground, { PlaygroundProvider } from './component-playground';

const origLocalStorage = window.localStorage;

describe('<ComponentPlayground />', () => {
  beforeAll(() => {
    window.localStorage = { setItem: () => {} };
  });

  afterAll(() => {
    window.localStorage = origLocalStorage;
  });

  const context = { styles: {
    components: { syntax: {} },
    prism: { light: 'light;', dark: 'dark;' }
  } };

  test('Should render the dark theme correctly', () => {
    const wrapper = render(<ComponentPlayground theme="dark" />, { context });
    expect(wrapper).toMatchSnapshot();
  });

  test('Should render the light theme correctly', () => {
    const wrapper = render(<ComponentPlayground theme="light" />, { context });
    expect(wrapper).toMatchSnapshot();
  });

  test('Should render with a custom background color', () => {
    const wrapper = render(
      <ComponentPlayground theme="light" previewBackgroundColor="#ff0" />,
      { context }
    );
    expect(wrapper).toMatchSnapshot();
  });

  test('Should render with a custom code block', () => {
    const code = `
      const Button = ({ title }) => (<button type="button">{ title }</button>);
      render(<Button title="My Button" />, mountNode);
    `;

    const wrapper = render(
      <ComponentPlayground
        theme="light"
        code={code}
        previewBackgroundColor="#ff0"
      />,
      { context }
    );
    expect(wrapper).toMatchSnapshot();
  });

  test('Should render custom scoped components', () => {
    const NewComponent = () => <div><h1>Hi!</h1></div>;
    const wrapper = shallow(<ComponentPlayground scope={{ NewComponent }} />, { context });

    const scope = wrapper.find(PlaygroundProvider).prop('scope');

    expect(scope.NewComponent).toEqual(NewComponent);
  });
});
