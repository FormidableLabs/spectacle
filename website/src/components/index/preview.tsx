import React from 'react';
import BodyCopy from '@site/src/components/global/body-copy';
import Button from '@site/src/components/global/button';
import SectionTitle from '@site/src/components/global/section-title';
import Wrapper from '@site/src/components/global/wrapper';

import styles from './preview.module.scss';

type VideoAsset = {
  mp4: string;
  still: string;
  webm: string;
  demoUrl: string;
};

interface Meta {
  theme: string;
  noMargin: boolean;
  noPadding: boolean;
}

export default function Preview({ content }): JSX.Element {
  const {
    meta,
    title,
    longText,
    videoAssets,
    buttonText,
    buttonUrl
  }: {
    meta: Meta;
    title: string;
    longText: string;
    videoAssets: VideoAsset;
    buttonText: string;
    buttonUrl: string;
  } = content;

  const isLightTheme: boolean =
    meta.theme === 'Light' || meta.theme === 'Color';

  return (
    <Wrapper background={meta.theme}>
      <SectionTitle light={isLightTheme}>{title}</SectionTitle>
      {longText && <BodyCopy light={isLightTheme}>{longText}</BodyCopy>}
      <a
        href={videoAssets.demoUrl}
        title="See the live preview"
        target="_blank"
        rel="noopener noreferrer"
      >
        <video
          className={styles.video}
          autoPlay
          muted
          loop
          poster={videoAssets.still}
        >
          <source src={videoAssets.webm} type="video/webm" />
          <source src={videoAssets.mp4} type="video/mp4" />
        </video>
      </a>
      {buttonText && buttonUrl && (
        <Button as={'href'} light={isLightTheme} to={buttonUrl}>
          {buttonText}
        </Button>
      )}
    </Wrapper>
  );
}
