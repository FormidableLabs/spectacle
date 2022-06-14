import React from 'react';
import { BodyCopy } from '@site/src/components/global/body-copy';
import { Button } from '@site/src/components/global/button';
import { SectionTitle } from '@site/src/components/global/section-title';
import { Stack } from '@site/src/components/global/stack';
import { Wrapper } from '@site/src/components/global/wrapper';
import { theme } from '@site/src/theme';

export default function GetStarted({ getStarted }): JSX.Element {
  return (
    <Wrapper background={theme.colors.bgLight}>
      <Stack spacingMobile={3} spacingTablet={5}>
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
}
