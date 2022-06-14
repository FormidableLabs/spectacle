import { FC, PropsWithChildren, ReactElement } from 'react';
import { ThemeProvider } from 'styled-components';

import defaultTheme from '../theme/default-theme';
import { Table, TableRow, TableCell, TableBody, TableHeader } from './table';
import { render } from '@testing-library/react';

const mountWithTheme = (tree: ReactElement) => {
  const WrappingThemeProvider = (props: PropsWithChildren) => (
    <ThemeProvider theme={defaultTheme}>{props.children}</ThemeProvider>
  );

  return render(tree, { wrapper: WrappingThemeProvider });
};

describe('<Table />', () => {
  it('should render a <table> with a <tr> for each row and a <td> with text for each cell', () => {
    const { container } = mountWithTheme(
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Row 1</TableCell>
            <TableCell>Row 1</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Row 2</TableCell>
            <TableCell>Row 2</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );

    expect(container.querySelector('table')).toBeDefined();

    const row1 = container.querySelectorAll('tr')[0],
      row2 = container.querySelectorAll('tr')[1];
    expect(row1.querySelectorAll('td')).toHaveLength(2);
    expect(row2.querySelectorAll('td')).toHaveLength(2);
  });

  it('should render a <table> with bold text for the header row', () => {
    const { container } = mountWithTheme(
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>Row 1, Col 1</TableCell>
            <TableCell>Row 1, Col 2</TableCell>
          </TableRow>
        </TableHeader>
      </Table>
    );

    expect(container.querySelector('thead')).toHaveStyle({
      fontWeight: 'bold'
    });
  });
});
