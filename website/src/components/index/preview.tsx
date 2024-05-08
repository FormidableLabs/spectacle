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

export default function Preview({ content }) {
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

  return (
    <Wrapper background={meta.theme} className={styles.wrapper}>
      <SectionTitle theme={meta.theme}>{title}</SectionTitle>
      {longText && <BodyCopy theme={meta.theme}>{longText}</BodyCopy>}
      <a
        href={videoAssets.demoUrl}
        title="See the live preview"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.demoUrl}
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
        <Button as={'href'} theme={meta.theme} to={buttonUrl}>
          {buttonText}
        </Button>
      )}
    </Wrapper>
  );
}
