import React from 'react';
import styled from 'styled-components';
import { SectionTitle } from '../../components/section-title';
import { Wrapper } from '../../components/wrapper';

const OuterWrapper = styled.div`
  background: #f3f3f3;
`;

const Video = styled.video`
  width: 100%;
  @media (max-width: 768px) {
    margin: 0 0 2rem 0;
  }
`;

const PreviewSources = {
  bgMp4: require('../../../public/static/bg-demo.mp4'),
  bgStill: require('../../../public/static/bg-still.png'),
  bgWebm: require('../../../public/static/bg-demo.webm'),
  demoUrl:
    'https://raw.githack.com/FormidableLabs/spectacle/master/examples/one-page.html'
};

const Preview = () => (
  <OuterWrapper>
    <Wrapper>
      <SectionTitle>Code Preview</SectionTitle>
      <a
        href={PreviewSources.demoUrl}
        title="See the live preview"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Video autoPlay muted loop poster={PreviewSources.bgStill}>
          <source src={PreviewSources.bgWebm} type="video/webm" />
          <source src={PreviewSources.bgMp4} type="video/mp4" />
        </Video>
      </a>
    </Wrapper>
  </OuterWrapper>
);

export default Preview;
