import React from 'react';
import styled from 'styled-components';
import { SectionTitle } from '@site/src/components/global/section-title';
import { Wrapper } from '@site/src/components/global/wrapper';
import { theme } from '@site/src/theme';

/* There is an issue currently with adding the autoPlay
 * prop to the Video component, this crashes the app
 * NOTE when autoPlay is removed it will load but the
 * muted prop is not being added to the component
 */

type VideoProps = {
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  poster: string;
};

const Video = styled.video<VideoProps>`
  width: 100%;
`;

export default function Preview({ preview }): JSX.Element {
  return (
    <Wrapper background={theme.colors.bg}>
      <SectionTitle>Code Preview</SectionTitle>
      <a
        href={preview.demoUrl}
        title="See the live preview"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Video muted loop poster={preview.bgStill}>
          <source src={preview.bgWebm} type="video/webm" />
          <source src={preview.bgMp4} type="video/mp4" />
        </Video>
      </a>
    </Wrapper>
  );
}
