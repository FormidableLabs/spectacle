import styled from 'styled-components';
import PropTypes from 'prop-types';

export const Stack = styled.div`
  display: flex;
  flex-direction: column;
  > * {
    margin-top: 0;
    margin-bottom: 0;
  }
  > * + * {
    margin-top: ${({ spacingMobile }) => `${spacingMobile}rem`};
  }
  @media ${p => p.theme.media.sm} {
    > * + * {
      margin-top: ${({ spacingTablet }) => `${spacingTablet}rem`};
    }
  }
`;

Stack.propTypes = {
  spacingMobile: PropTypes.number,
  spacingTablet: PropTypes.number,
  children: PropTypes.node.isRequired
};

Stack.defaultProps = {
  spacingMobile: 3,
  spacingTablet: 5
};
