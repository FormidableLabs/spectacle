import React from 'react';
import styled from 'styled-components';
import { BodyCopy } from '@site/src/components/global/body-copy';
import { Button } from '@site/src/components/global/button';
import { SectionTitle } from '@site/src/components/global/section-title';
import { Wrapper } from '@site/src/components/global/wrapper';

type VideoProps = {
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  poster: string;
};

type VideoAsset = {
  bgMp4: string;
  bgStill: string;
  bgWebm: string;
  demoUrl: string;
};

interface Meta {
  theme: string;
  noMargin: boolean;
  noPadding: boolean;
}

const Video = styled.video<VideoProps>`
  width: 100%;
`;

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
        <Video autoPlay muted loop poster={videoAssets.bgStill}>
          <source src={videoAssets.bgWebm} type="video/webm" />
          <source src={videoAssets.bgMp4} type="video/mp4" />
        </Video>
      </a>
      {buttonText && buttonUrl && (
        <Button light={isLightTheme} to={buttonUrl}>
          {buttonText}
        </Button>
      )}
    </Wrapper>
  );
}
