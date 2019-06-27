import React from 'react';
import PropTypes from 'prop-types';

import {
  StyledBlockQuote,
  StyledBlockQuoteContainer
} from './BlockQuote.style';

function BlockQuote({ children, font, noQuotes, fontSize, color }) {
  return !noQuotes ? (
    <StyledBlockQuoteContainer>
      <StyledBlockQuote font={font} fontSize={fontSize} color={color}>
        &quot;{children}&quot;
      </StyledBlockQuote>
    </StyledBlockQuoteContainer>
  ) : (
    <StyledBlockQuoteContainer>
      <StyledBlockQuote font={font} fontSize={fontSize} color={color}>
        {children}
      </StyledBlockQuote>
    </StyledBlockQuoteContainer>
  );
}

BlockQuote.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.string,
  font: PropTypes.string,
  fontSize: PropTypes.string,
  noQuotes: PropTypes.bool
};

export { BlockQuote };
