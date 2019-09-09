import styled from 'styled-components';
import { color, typography, space, compose } from 'styled-system';

const Text = styled('div')(
  compose(
    color,
    typography,
    space
  )
);
Text.defaultProps = {
  color: 'primary',
  fontFamily: 'text',
  fontSize: 'text',
  textAlign: 'left',
  padding: 0,
  margin: 'textMargin'
};

const Heading = styled(Text)({});
Heading.defaultProps = {
  color: 'secondary',
  fontFamily: 'header',
  fontSize: 'header',
  fontWeight: 'bold',
  textAlign: 'center',
  margin: 'headerMargin'
};

const Quote = styled(Text)`
  border-left: 1px solid
    ${({ theme, borderColor }) => borderColor || theme.colors.secondary};
`;
Quote.defaultProps = {
  color: 'primary',
  fontFamily: 'text',
  fontSize: 'text',
  textAlign: 'left',
  fontStyle: 'italic',
  padding: '16px 0 16px 8px',
  margin: 'textMargin'
};

const OrderedList = styled('ol')(
  compose(
    color,
    typography,
    space
  )
);
OrderedList.defaultProps = {
  color: 'primary',
  fontFamily: 'text',
  fontSize: 'text',
  textAlign: 'left',
  margin: 'listMargin'
};

const UnorderedList = styled('ul')(
  compose(
    color,
    typography,
    space
  )
);
UnorderedList.defaultProps = {
  color: 'primary',
  fontFamily: 'text',
  fontSize: 'text',
  textAlign: 'left',
  margin: 'listMargin'
};

const ListItem = styled('li')(
  compose(
    color,
    typography,
    space
  )
);

export { Text, Heading, Quote, OrderedList, UnorderedList, ListItem };
