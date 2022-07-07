import React from 'react';
import styled from 'styled-components';
import { BodyCopy } from '@site/src/components/global/body-copy';
import { Button } from '@site/src/components/global/button';
import { SectionTitle } from '@site/src/components/global/section-title';
import { Stack } from '@site/src/components/global/stack';
import { Wrapper } from '@site/src/components/global/wrapper';

interface Meta {
  theme: string;
  noMargin: boolean;
  noPadding: boolean;
}

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media ${({ theme }) => theme.media.sm} {
    flex-direction: row;
  }
`;

const CallToAction = styled(Button)`
  margin: 2rem auto;

  @media ${({ theme }) => theme.media.sm} {
    margin: 3rem;
  }
`;

export default function GetStarted({ content }): JSX.Element {
  const {
    meta,
    title,
    longText,
    primaryButtonText,
    primaryButtonUrl,
    secondaryButtonText,
    secondaryButtonUrl
  }: {
    meta: Meta;
    title: string;
    longText: string;
    primaryButtonText: string;
    primaryButtonUrl: string;
    secondaryButtonText: string;
    secondaryButtonUrl: string;
  } = content;

  const isLightTheme = meta.theme === 'Light' || meta.theme === 'Color';

  return (
    <Wrapper background={meta.theme}>
      <Stack spacingMobile={3} spacingTablet={5}>
        <SectionTitle light={isLightTheme}>{title}</SectionTitle>
        <BodyCopy light={isLightTheme}>{longText}</BodyCopy>
        <Buttons>
          <CallToAction light={isLightTheme} to={primaryButtonUrl}>
            {primaryButtonText}
          </CallToAction>
          {secondaryButtonText && secondaryButtonUrl && (
            <CallToAction light={isLightTheme} to={secondaryButtonUrl}>
              {secondaryButtonText}
            </CallToAction>
          )}
        </Buttons>
      </Stack>
    </Wrapper>
  );
}
