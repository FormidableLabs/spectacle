import styled from 'styled-components';
import PropTypes from 'prop-types';
import { theme } from '../theme';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  margin: ${({ noMargin }) => (noMargin ? '0' : 'auto')};
  padding: ${({ noPadding }) => (noPadding ? '0' : '4rem')};
  background: ${({ background }) => background || theme.colors.bgLight};
  text-align: center;

  @media ${p => p.theme.media.sm} {
    padding: ${({ noPadding }) => (noPadding ? '0' : '8rem')};
  }
`;

Wrapper.propTypes = {
  noMargin: PropTypes.bool,
  noPadding: PropTypes.bool,
  background: PropTypes.string
};

Wrapper.defaultProps = {
  noMargin: false,
  noPadding: false
};
