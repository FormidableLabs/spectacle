// `react`, `react-dom`, and `spectacle` are already provided as built-in dependencies.
import React from 'react';

// Use all of the power of Spectacle components!
import { Heading, Text } from 'spectacle';

// Also use `babel-plugin-codegen` available via custom `.babelrc` and local dependency.
/* global codegen*/
const message = codegen`module.exports = "'This message was babel codegen-ed'";`;

const SpectacleSlide = () => {
  return (
    <React.Fragment>
      <Heading>A Spectacle JSX Component</Heading>
      <Text>{message}!</Text>
    </React.Fragment>
  );
};

export default SpectacleSlide;
