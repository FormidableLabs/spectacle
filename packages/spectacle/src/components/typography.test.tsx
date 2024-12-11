import { PropsWithChildren, ReactElement } from 'react';
import { ThemeProvider } from 'styled-components';
import useResizeObserver from 'use-resize-observer';

import defaultTheme from '../theme/default-theme';
import {
  Text,
  Heading,
  Quote,
  OrderedList,
  UnorderedList,
  ListItem,
  Link,
  CodeSpan,
  FitText
} from './typography';
import { render } from '@testing-library/react';
// Mock useResizeObserver for FitText tests
jest.mock('use-resize-observer');
const mockedUseResizeObserver = useResizeObserver as jest.Mock;

const mountWithTheme = (tree: ReactElement | JSX.Element) => {
  const WrappingThemeProvider = (props: PropsWithChildren) => (
    <ThemeProvider theme={defaultTheme}>{props.children}</ThemeProvider>
  );
  return render(tree, { wrapper: WrappingThemeProvider });
};

describe('<Text />', () => {
  it('should render a <div> with text', () => {
    const { container } = mountWithTheme(<Text>Spectacle!</Text>);
    expect(container.querySelector('div')?.innerHTML).toBe('Spectacle!');
  });
});

describe('<Heading />', () => {
  it('should render a <Text /> component with h1 size', () => {
    const { getByText } = mountWithTheme(<Heading>Spectacle!</Heading>);
    expect(getByText('Spectacle!')).toHaveStyle({ fontSize: 'h1' });
  });
});

describe('<Quote />', () => {
  it('should render a <Text /> component with a left border', () => {
    const { getByText } = mountWithTheme(<Quote>Spectacle!</Quote>);
    expect(getByText('Spectacle!')).toHaveStyle({
      borderLeft: '1px solid #fc6986'
    });
  });
});

describe('<OrderedList />', () => {
  it('should render an <ol> with <li> children', () => {
    const { container, getByText } = mountWithTheme(
      <OrderedList>
        <ListItem>This is an</ListItem>
        <ListItem>Ordered List</ListItem>
      </OrderedList>
    );

    expect(container.querySelectorAll('ol')).toHaveLength(1);
    expect(container.querySelectorAll('li')).toHaveLength(2);
    expect(getByText('This is an')).toBeDefined();
    expect(getByText('Ordered List')).toBeDefined();
  });
});

describe('<UnorderedList />', () => {
  it('should render a <ul> with <li> children', () => {
    const { container, getByText } = mountWithTheme(
      <UnorderedList>
        <ListItem>This is an</ListItem>
        <ListItem>Unordered List</ListItem>
      </UnorderedList>
    );

    expect(container.querySelectorAll('ul')).toHaveLength(1);
    expect(container.querySelectorAll('li')).toHaveLength(2);
    expect(getByText('This is an')).toBeDefined();
    expect(getByText('Unordered List')).toBeDefined();
  });
});

describe('<Link />', () => {
  it('should render an <a> with text', () => {
    const { container } = mountWithTheme(<Link>Spectacle!</Link>);

    expect(container.querySelector('a')?.innerHTML).toBe('Spectacle!');
  });
});

describe('<CodeSpan />', () => {
  it('should render a <code> with text', () => {
    const { container } = mountWithTheme(<CodeSpan>Code!</CodeSpan>);

    expect(container.querySelector('code')?.innerHTML).toBe('Code!');
  });
});

describe('<FitText />', () => {
  beforeEach(() => {
    // Default mock implementation
    mockedUseResizeObserver.mockImplementation(({ onResize }) => {
      onResize({ width: 500, height: 100 });
      return { ref: null };
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render text content correctly', () => {
    const { getByText } = mountWithTheme(<FitText>Spectacle!</FitText>);
    expect(getByText('Spectacle!')).toBeInTheDocument();
  });

  it('should apply color and typography props correctly', () => {
    const { getByText } = mountWithTheme(
      <FitText color="secondary" fontSize="h1">Spectacle!</FitText>
    );
    const textElement = getByText('Spectacle!');
    expect(textElement).toHaveStyle({ color: defaultTheme.colors.secondary });
    expect(textElement).toHaveStyle({ fontSize: 'h1' });
  });

  it('should scale text when container size changes', () => {
    // Simulate a container that's smaller than the text
    mockedUseResizeObserver.mockImplementation(({ onResize }) => {
      onResize({ width: 100, height: 100 });
      return { ref: null };
    });

    const { container } = mountWithTheme(<FitText>Long text that needs scaling</FitText>);
    const scaledText = container.querySelector('div[scale]');
    expect(scaledText).toHaveStyle({ transform: expect.stringContaining('scale') });
  });

  it('should center text in container', () => {
    const { container } = mountWithTheme(<FitText>Centered text</FitText>);
    const fitContainer = container.firstChild;
    expect(fitContainer).toHaveStyle({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    });
  });
});
