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

const Preview = ({ preview }) => (
  <OuterWrapper>
    <Wrapper background="linear-gradient(242deg, #c75269 101%, #895160 -11%)">
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
  </OuterWrapper>
);

Preview.propTypes = {
  preview: PropTypes.arrayOf(
    PropTypes.shape({
      bgMp4: PropTypes.string,
      bgStill: PropTypes.string,
      bgWebm: PropTypes.string,
      demoUrl: PropTypes.string
    }).isRequired
  )
};

export default Preview;
