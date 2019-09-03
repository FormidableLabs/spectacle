import styled from 'styled-components';
import { color, typography, space, compose } from 'styled-system';

export const Text = styled('div')(
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

export const Heading = styled(Text)({});
Heading.defaultProps = {
  color: 'secondary',
  fontFamily: 'header',
  fontSize: 'header',
  fontWeight: 'bold',
  textAlign: 'center',
  margin: 'headerMargin'
};
