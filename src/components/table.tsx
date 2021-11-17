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

const Table = styled.table<TableProps>(
  compose(color, typography, space, border, layout)
);

Table.defaultProps = {
  color: 'primary',
  fontFamily: 'text',
  fontSize: 'text',
  textAlign: 'left',
  margin: 'listMargin',
  width: 1
};

const TableHeader = styled.thead<TableProps>(
  compose(color, typography, space, border, layout)
);

TableHeader.defaultProps = {
  color: 'primary',
  fontFamily: 'text',
  fontSize: 'text',
  fontWeight: 'bold',
  textAlign: 'left',
  margin: 'listMargin'
};

const TableBody = styled.tbody<TableProps>(
  compose(color, typography, space, border, layout)
);

TableBody.defaultProps = {
  color: 'primary',
  fontFamily: 'text',
  fontSize: 'text',
  textAlign: 'left',
  margin: 'listMargin',
  width: 1
};

const TableRow = styled.tr<TableProps>(
  compose(color, typography, space, border, layout)
);

TableRow.defaultProps = {
  color: 'primary',
  fontFamily: 'text',
  fontSize: 'text',
  textAlign: 'left',
  margin: 'listMargin'
};

const TableCell = styled.td<TableProps>(
  compose(color, typography, space, border, layout)
);

TableCell.defaultProps = {
  color: 'primary',
  fontFamily: 'text',
  fontSize: 'text',
  textAlign: 'left',
  margin: 'listMargin'
};

export { Table, TableCell, TableRow, TableHeader, TableBody };
