import PropTypes from 'prop-types';
import styled from 'react-emotion';

export const Fill = styled.div`
  flex: 1;
`;

Fill.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object
};
