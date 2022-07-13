import React from 'react';
import styled from 'styled-components';
import { BodyCopy } from '@site/src/components/global/body-copy';
import { SecondaryTitle } from '@site/src/components/global/secondary-title';
import { SectionTitle } from '@site/src/components/global/section-title';
import { Stack } from '@site/src/components/global/stack';
import { Wrapper } from '@site/src/components/global/wrapper';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
  light?: string;
};

type Meta = {
  theme: string;
  noMargin: boolean;
  noPadding: boolean;
};

const FeaturesContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 3rem;
  max-width: 132rem;
  margin-left: auto;
  margin-right: auto;

  @media ${({ theme }) => theme.media.sm} {
    grid-template-columns: repeat(3, 1fr);
  }

  @media ${({ theme }) => theme.media.md} {
    grid-gap: 5rem;
  }
`;

const FeatureCard = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;

  > * {
    margin-top: 0;
    margin-bottom: 0;
  }

  > * + * {
    margin-top: 4rem;
  }

  svg {
    height: auto;
    max-width: 100%;
  }
`;

const FeatureInfo = styled.div`
  max-width: 30rem;
`;

function Feature({ title, Svg, description, light }: FeatureItem) {
  return (
    <FeatureCard key={title}>
      <Svg role="img" />
      <FeatureInfo>
        <SecondaryTitle light={light === 'Light' || light === 'Color'}>
          {title}
        </SecondaryTitle>
        <BodyCopy light={light === 'Light' || light === 'Color'}>
          {description}
        </BodyCopy>
      </FeatureInfo>
    </FeatureCard>
  );
}

export default function Features({ content }): JSX.Element {
  const {
    meta,
    title,
    featureList
  }: { meta: Meta; title: string; featureList: FeatureItem[] } = content;

  return (
    <Wrapper
      noMargin={meta.noMargin}
      noPadding={meta.noPadding}
      background={meta.theme}
    >
      <Stack spacingMobile={3} spacingTablet={5}>
        <SectionTitle light={meta.theme === 'Light' || meta.theme === 'Color'}>
          {title}
        </SectionTitle>
        <FeaturesContainer>
          {featureList.map((props, idx) => (
            <Feature key={idx} light={meta.theme} {...props} />
          ))}
        </FeaturesContainer>
      </Stack>
    </Wrapper>
  );
}
