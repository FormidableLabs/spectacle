/* eslint-disable react/prop-types */
import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { ThemeProvider } from 'styled-components';

import defaultTheme from '../theme/default-theme';
import {
  Text,
  Heading,
  Quote,
  OrderedList,
  UnorderedList,
  ListItem,
  Link,
  CodeSpan
} from './typography';

Enzyme.configure({ adapter: new Adapter() });

const mountWithTheme = tree => {
  const WrappingThemeProvider = props => (
    <ThemeProvider theme={defaultTheme}>{props.children}</ThemeProvider>
  );
  return mount(tree, { wrappingComponent: WrappingThemeProvider });
};

describe('<Text />', () => {
  it('should render a <div> with text', () => {
    const wrapper = mountWithTheme(<Text>Spectacle!</Text>);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('<Heading />', () => {
  it('should render a <Text /> component with h1 size', () => {
    const wrapper = mountWithTheme(<Heading>Spectacle!</Heading>);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('<Quote />', () => {
  it('should render a <Text /> component with a left border', () => {
    const wrapper = mountWithTheme(<Quote>Spectacle!</Quote>);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('<OrderedList />', () => {
  it('should render an <ol> with <li> children', () => {
    const wrapper = mountWithTheme(
      <OrderedList>
        <ListItem>This is an</ListItem>
        <ListItem>Ordered List</ListItem>
      </OrderedList>
    );
    expect(wrapper).toMatchSnapshot();
  });
});

describe('<UnorderedList />', () => {
  it('should render a <ul> with <li> children', () => {
    const wrapper = mountWithTheme(
      <UnorderedList>
        <ListItem>This is an</ListItem>
        <ListItem>Unordered List</ListItem>
      </UnorderedList>
    );
    expect(wrapper).toMatchSnapshot();
  });
});

describe('<Link />', () => {
  it('should render an <a> with text', () => {
    const wrapper = mountWithTheme(<Link>Spectacle!</Link>);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('<CodeSpan />', () => {
  it('should render a <code> with text', () => {
    const wrapper = mountWithTheme(<CodeSpan>Code!</CodeSpan>);
    expect(wrapper).toMatchSnapshot();
  });
});
