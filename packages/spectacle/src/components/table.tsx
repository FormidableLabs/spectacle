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

const Table = styled.table.attrs<TableProps>((props) => ({
  color: 'primary',
  fontFamily: 'text',
  fontSize: 'text',
  textAlign: 'left',
  margin: 'listMargin',
  width: 1,
  ...props
}))<TableProps>(compose(color, typography, space, border, layout));

const TableHeader = styled.thead.attrs<TableProps>((props) => ({
  color: 'primary',
  fontFamily: 'text',
  fontSize: 'text',
  fontWeight: 'bold',
  textAlign: 'left',
  margin: 'listMargin',
  ...props
}))<TableProps>(compose(color, typography, space, border, layout));

const TableBody = styled.tbody.attrs<TableProps>((props) => ({
  color: 'primary',
  fontFamily: 'text',
  fontSize: 'text',
  textAlign: 'left',
  margin: 'listMargin',
  width: 1,
  ...props
}))<TableProps>(compose(color, typography, space, border, layout));

const TableRow = styled.tr.attrs<TableProps>((props) => ({
  color: 'primary',
  fontFamily: 'text',
  fontSize: 'text',
  textAlign: 'left',
  margin: 'listMargin',
  ...props
}))<TableProps>(compose(color, typography, space, border, layout));

const TableCell = styled.td.attrs<TableProps>((props) => ({
  color: 'primary',
  fontFamily: 'text',
  fontSize: 'text',
  textAlign: 'left',
  margin: 'listMargin',
  ...props
}))<TableProps>(compose(color, typography, space, border, layout));

export { Table, TableCell, TableRow, TableHeader, TableBody };
