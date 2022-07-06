import { PropsWithChildren, ReactElement } from 'react';
import { ThemeProvider } from 'styled-components';

import { DeckContext, DeckContextType } from './deck/deck';
import defaultTheme from '../theme/default-theme';
import Progress from './progress';
import { DeepPartial } from '../types/deep-partial';
import { render } from '@testing-library/react';

const mountWithContext = (
  tree: ReactElement,
  context: DeepPartial<DeckContextType>
) => {
  const WrappingThemeProvider = (props: PropsWithChildren<{}>) => (
    <DeckContext.Provider
      value={{
        ...(context as DeckContextType),
        skipTo: jest.fn()
      }}
    >
      <ThemeProvider theme={defaultTheme}>{props.children}</ThemeProvider>
    </DeckContext.Provider>
  );
  return render(tree, { wrapper: WrappingThemeProvider });
};

describe('<Progress />', () => {
  it('should render the right amount of circles', () => {
    const { queryAllByTestId } = mountWithContext(<Progress />, {
      slideCount: 5,
      activeView: {
        slideIndex: 0
      }
    });

    expect(queryAllByTestId('Progress Circle')).toHaveLength(5);
  });

  it('should render the right amount of circles with the current circle in the active state', () => {
    const { queryAllByTestId } = mountWithContext(<Progress />, {
      slideCount: 5,
      activeView: {
        slideIndex: 4
      }
    });

    expect(queryAllByTestId('Progress Circle')[4]).toHaveStyle({
      background: '#fff'
    });
  });
});
