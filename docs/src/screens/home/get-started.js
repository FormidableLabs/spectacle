import React from 'react';
import PropTypes from 'prop-types';

import { BodyCopy } from '../../components/body-copy';
import { Button } from '../../components/button';
import { SectionTitle } from '../../components/section-title';
import { Stack } from '../../components/stack';
import { Wrapper } from '../../components/wrapper';
import { theme } from '../../theme';

const GetStarted = ({ getStarted }) => (
  <Wrapper background={theme.colors.bgLight}>
    <Stack>
      <SectionTitle>Get Started</SectionTitle>
      <BodyCopy>{getStarted.description}</BodyCopy>
      <Button
        color={theme.colors.button}
        text={theme.colors.bg}
        to={getStarted.link}
      >
        Documentation
      </Button>
    </Stack>
  </Wrapper>
);

GetStarted.propTypes = {
  getStarted: PropTypes.shape({
    description: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired
  }).isRequired
};

export default GetStarted;
