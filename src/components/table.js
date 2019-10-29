import styled from 'styled-components';
import {
  color,
  typography,
  space,
  compose,
  border,
  layout
} from 'styled-system';

const Table = styled('table')(
  compose(
    color,
    typography,
    space,
    border,
    layout
  )
);

Table.defaultProps = {
  color: 'primary',
  fontFamily: 'text',
  fontSize: 'text',
  textAlign: 'left',
  margin: 'listMargin'
};

const TableRow = styled('tr')(
  compose(
    color,
    typography,
    space,
    border,
    layout
  )
);

TableRow.defaultProps = {
  color: 'primary',
  fontFamily: 'text',
  fontSize: 'text',
  textAlign: 'left',
  margin: 'listMargin'
};

const TableCell = styled('td')(
  compose(
    color,
    typography,
    space,
    border,
    layout
  )
);

TableCell.defaultProps = {
  color: 'primary',
  fontFamily: 'text',
  fontSize: 'text',
  textAlign: 'left',
  margin: 'listMargin'
};

export { Table, TableCell, TableRow };
