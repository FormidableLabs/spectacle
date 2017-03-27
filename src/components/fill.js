import { PropTypes } from "react";
import styled from "styled-components";

export const Fill = styled.div`
  flex: 1;
`;

Fill.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object
};
