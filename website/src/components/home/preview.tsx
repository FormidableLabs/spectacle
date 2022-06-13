/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import { SectionTitle } from '@site/src/components/global/section-title';
import { Wrapper } from '@site/src/components/global/wrapper';
import { theme } from '@site/src/theme';

const Video = styled.video`
  width: 100%;
`;

export default function Preview({ preview }): JSX.Element {
  console.log('preview', preview);

  return (
    <Wrapper noPadding={false} noMargin={false} background={theme.colors.bg}>
      <SectionTitle>Code Preview</SectionTitle>
      <a
        href={preview.demoUrl}
        title="See the live preview"
        target="_blank"
        rel="noopener noreferrer"
      >
        {/* <Video autoPlay muted loop poster={preview.bgStill}>
          <source src={preview.bgWebm} type="video/webm" />
          <source src={preview.bgMp4} type="video/mp4" />
        </Video> */}
      </a>
    </Wrapper>
  );
}
