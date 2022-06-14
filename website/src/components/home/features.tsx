import React from 'react';
import styled from 'styled-components';
import { BodyCopy } from '@site/src/components/global/body-copy';
import { SecondaryTitle } from '@site/src/components/global/secondary-title';
import { SectionTitle } from '@site/src/components/global/section-title';
import { Stack } from '@site/src/components/global/stack';
import { Wrapper } from '@site/src/components/global/wrapper';
import { theme } from '@site/src/theme';

const FeaturesContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 3rem;
  max-width: 132rem;
  margin-left: auto;
  margin-right: auto;

  @media ${(p) => p.theme.media.sm} {
    grid-template-columns: repeat(3, 1fr);
  }

  @media ${(p) => p.theme.media.md} {
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
    margin-top: 2rem;
  }

  svg {
    height: auto;
    max-width: 100%;
  }
`;

const FeatureInfo = styled.div`
  max-width: 30rem;
`;

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Interactive Presentations',
    Svg: require('@site/static/svg/button.svg').default,
    description: (
      <>
        Add clickable elements and other interactivity to make your
        presentations pop.
      </>
    )
  },
  {
    title: 'Live-Preview Your Code',
    Svg: require('@site/static/svg/code-preview.svg').default,
    description: (
      <>
        Show people more than just a code block - demo the final project in
        real-time without leaving your presentation deck.
      </>
    )
  },
  {
    title: '... and More!',
    Svg: require('@site/static/svg/amazing.svg').default,
    description: (
      <>
        Polish off your presentation with auto-formatting, easy themeing, image
        dimming, and other fun touches available out of the box.
      </>
    )
  }
];

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <FeatureCard key={title}>
      <Svg role="img" />
      <FeatureInfo>
        <SecondaryTitle>{title}</SecondaryTitle>
        <BodyCopy>{description}</BodyCopy>
      </FeatureInfo>
    </FeatureCard>
  );
}

export default function Features(): JSX.Element {
  return (
    <Wrapper background={theme.colors.bgLight}>
      <Stack spacingMobile={3} spacingTablet={5}>
        <SectionTitle>Features</SectionTitle>
        <FeaturesContainer>
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </FeaturesContainer>
      </Stack>
    </Wrapper>
  );
}
