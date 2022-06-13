import React from 'react';
import PropTypes from 'prop-types';

import { BodyCopy } from '@site/src/components/global/body-copy';
import { Button } from '@site/src/components/global/button';
import { SectionTitle } from '@site/src/components/global/section-title';
import { Stack } from '@site/src/components/global/stack';
import { Wrapper } from '@site/src/components/global/wrapper';
import { theme } from '@site/src/theme';

const GetStarted = ({ getStarted }) => (
  <Wrapper noPadding={false} noMargin={false} background={theme.colors.bgLight}>
    <Stack spacingMobile={3} spacingTablet={5}>
      <SectionTitle>Get Started</SectionTitle>
      <BodyCopy>{getStarted.description}</BodyCopy>
      <Button
        color={theme.colors.button}
        text={theme.colors.bg}
        to={getStarted.link}
        noMargin={false}
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
