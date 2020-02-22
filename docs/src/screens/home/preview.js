import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { BodyCopy } from '../../components/body-copy';
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
  bgWebm: require('../../../public/static/bg-demo.webm')
};

class Preview extends React.Component {
  render() {
    const { previewObj } = this.props;

    return (
      <OuterWrapper>
        <Wrapper>
          <SectionTitle>Code Preview</SectionTitle>
          <BodyCopy>{previewObj.description}</BodyCopy>
          <Video autoPlay muted loop poster={PreviewSources.bgStill}>
            <source src={PreviewSources.bgWebm} type="video/webm" />
            <source src={PreviewSources.bgMp4} type="video/mp4" />
          </Video>
        </Wrapper>
      </OuterWrapper>
    );
  }
}

Preview.propTypes = {
  previewObj: PropTypes.object
};

export default Preview;
