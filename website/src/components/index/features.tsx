import React from 'react';
import BodyCopy from '@site/src/components/global/body-copy';
import SecondaryTitle from '@site/src/components/global/secondary-title';
import SectionTitle from '@site/src/components/global/section-title';
import Stack from '@site/src/components/global/stack';
import Wrapper from '@site/src/components/global/wrapper';
import styles from './features.module.scss';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
  theme: string;
};

type Meta = {
  theme: string;
  noMargin: boolean;
  noPadding: boolean;
};

function Feature({ title, Svg, description, theme }: FeatureItem) {
  return (
    <div className={styles.featureCard} key={title}>
      <Svg role="img" />
      <div className={styles.featureInfo}>
        <SecondaryTitle theme={theme}>{title}</SecondaryTitle>
        <BodyCopy theme={theme}>{description}</BodyCopy>
      </div>
    </div>
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
      <Stack>
        <SectionTitle theme={meta.theme}>{title}</SectionTitle>
        <div className={styles.featuresContainer}>
          {featureList.map((props, idx) => (
            <Feature key={idx} theme={meta.theme} {...props} />
          ))}
        </div>
      </Stack>
    </Wrapper>
  );
}
