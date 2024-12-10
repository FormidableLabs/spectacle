import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import defaultTheme from '../../theme/default-theme';
import { FitText } from './fit-text';

const mountWithTheme = (tree: React.ReactElement) => {
  return render(<ThemeProvider theme={defaultTheme}>{tree}</ThemeProvider>);
};

describe('<FitText />', () => {
  it('should render text content', () => {
    const { getByText } = mountWithTheme(<FitText>Spectacle!</FitText>);
    expect(getByText('Spectacle!')).toBeInTheDocument();
  });

  it('should maintain text color from props', () => {
    const { getByText } = mountWithTheme(
      <FitText color="secondary">Colored Text</FitText>
    );
    expect(getByText('Colored Text')).toHaveStyle({
      color: defaultTheme.colors.secondary
    });
  });
});
