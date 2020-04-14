/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import { SectionTitle } from '../../components/section-title';
import { Wrapper } from '../../components/wrapper';
import { theme } from '../../theme';

const Video = styled.video`
  width: 100%;
`;

const Preview = ({ preview }) => (
  <Wrapper background={theme.colors.bg}>
    <SectionTitle>Code Preview</SectionTitle>
    <a
      href={preview.demoUrl}
      title="See the live preview"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Video autoPlay muted loop poster={preview.bgStill}>
        <source src={preview.bgWebm} type="video/webm" />
        <source src={preview.bgMp4} type="video/mp4" />
      </Video>
    </a>
  </Wrapper>
);

export default Preview;
