import PropTypes from 'prop-types';
import styled from 'react-emotion';

export const Fit = styled.div`
  flex: 0;
`;

Fit.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object
};
