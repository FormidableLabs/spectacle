import { FC } from 'react';
import styled from 'styled-components';
import {
  color,
  typography,
  space,
  compose,
  border,
  layout,
  ColorProps,
  TypographyProps,
  SpaceProps,
  BorderProps,
  LayoutProps
} from 'styled-system';

export type TableProps = ColorProps &
  TypographyProps &
  SpaceProps &
  BorderProps &
  LayoutProps;

const Table = styled('table')(
  compose(color, typography, space, border, layout)
) as FC<TableProps>;

Table.defaultProps = {
  color: 'primary',
  fontFamily: 'text',
  fontSize: 'text',
  textAlign: 'left',
  margin: 'listMargin',
  width: 1
};

const TableHeader = styled('thead')(
  compose(color, typography, space, border, layout)
) as FC<TableProps>;

TableHeader.defaultProps = {
  color: 'primary',
  fontFamily: 'text',
  fontSize: 'text',
  fontWeight: 'bold',
  textAlign: 'left',
  margin: 'listMargin'
};

const TableBody = styled('tbody')(
  compose(color, typography, space, border, layout)
) as FC<TableProps>;

TableBody.defaultProps = {
  color: 'primary',
  fontFamily: 'text',
  fontSize: 'text',
  textAlign: 'left',
  margin: 'listMargin',
  width: 1
};

const TableRow = styled('tr')(
  compose(color, typography, space, border, layout)
) as FC<TableProps>;

TableRow.defaultProps = {
  color: 'primary',
  fontFamily: 'text',
  fontSize: 'text',
  textAlign: 'left',
  margin: 'listMargin'
};

const TableCell = styled('td')(
  compose(color, typography, space, border, layout)
) as FC<TableProps>;

TableCell.defaultProps = {
  color: 'primary',
  fontFamily: 'text',
  fontSize: 'text',
  textAlign: 'left',
  margin: 'listMargin'
};

export { Table, TableCell, TableRow, TableHeader, TableBody };
