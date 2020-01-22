// `react`, `react-dom`, and `spectacle` are already provided as built-in dependencies.
import React from 'react';

// Other things like `prop-types` are not and must be separately available in the import path.
import PropTypes from 'prop-types';

const Test = ({ height }) => {
  return (
    <div
      style={{
        height,
        width: '100%',
        backgroundColor: 'yellow',
        fontSize: '2em',
        color: 'blue'
      }}
    >
      JSX React component
    </div>
  );
};

Test.propTypes = {
  height: PropTypes.number.isRequired
};

export default Test;
