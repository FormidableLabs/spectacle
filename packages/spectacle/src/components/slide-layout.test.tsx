import { ReactElement } from 'react';
import { render } from '@testing-library/react';
import Deck from './deck';
import SlideLayout from './slide-layout';
import { Heading, Text } from './typography';

jest.mock('../hooks/use-broadcast-channel', () => {
  return {
    __esModule: true,
    default: function useBroadcastChannel() {
      return [() => {}];
    }
  };
});

const renderInDeck = (tree: ReactElement | JSX.Element) =>
  render(<Deck>{tree}</Deck>);

describe('SlideLayout', () => {
  it('SlideLayout.Full should render a slide with children content passed through', () => {
    const { getByText } = renderInDeck(
      <SlideLayout.Full>
        <Heading>Hey world</Heading>
      </SlideLayout.Full>
    );

    expect(getByText('Hey world')).toBeDefined();
  });

  it('SlideLayout.Center should render children content in a centered flex element', () => {
    const { getByText } = renderInDeck(
      <SlideLayout.Center>
        <Heading>Hey world</Heading>
      </SlideLayout.Center>
    );

    expect(getByText('Hey world')?.parentElement?.parentElement).toHaveStyle({
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    });
  });

  it('SlideLayout.TwoColumn should render content side-by-side in flex container', () => {
    const { getByText } = renderInDeck(
      <SlideLayout.TwoColumn
        left={<Text>Left</Text>}
        right={<Text>Right</Text>}
      />
    );

    expect(getByText('Left')).toBeDefined();
    expect(getByText('Right')).toBeDefined();
    expect(getByText('Left')?.parentElement?.parentElement).toHaveStyle({
      display: 'flex',
      flexDirection: 'row'
    });
  });

  it('SlideLayout.List should render a title if provided', () => {
    const { getByText } = renderInDeck(
      <SlideLayout.List title="Title" items={[]} />
    );

    expect(getByText('Title')).toBeDefined();
  });

  it('SlideLayout.List should pass props to title if passed', () => {
    const { getByText } = renderInDeck(
      <SlideLayout.List
        title="Title"
        titleProps={{ color: 'purple' }}
        items={[]}
      />
    );

    expect(getByText('Title')).toHaveStyle({ color: 'purple' });
  });

  it('SlideLayout.List render items to list', () => {
    const { getByText, container } = renderInDeck(
      <SlideLayout.List items={['foo', 'bar', 'baz']} />
    );

    expect(container.querySelectorAll('ul')).toHaveLength(1);
    expect(container.querySelectorAll('ul > li')).toHaveLength(3);
    expect(getByText('foo')).toBeDefined();
    expect(getByText('bar')).toBeDefined();
    expect(getByText('baz')).toBeDefined();
  });

  it('SlideLayout.List can render to ol instead of ul', () => {
    const { container } = renderInDeck(
      <SlideLayout.List items={['foo', 'bar', 'baz']} listType="ordered" />
    );

    expect(container.querySelectorAll('ol')).toHaveLength(1);
    expect(container.querySelectorAll('ol > li')).toHaveLength(3);
  });

  it('SlideLayout.List should pass props to list if provided', () => {
    const { container } = renderInDeck(
      <SlideLayout.List
        items={['foo', 'bar', 'baz']}
        listProps={{ color: 'green' }}
      />
    );

    expect(container.querySelector('ul')).toHaveStyle({ color: 'green' });
  });

  it('SlideLayout.List should allow list items to be animated in', () => {
    const { queryAllByTestId } = renderInDeck(
      <SlideLayout.List
        items={['foo', 'bar', 'baz']}
        listProps={{ color: 'green' }}
        animateListItems
      />
    );

    expect(queryAllByTestId('AppearElement')).toHaveLength(3);
  });
});
