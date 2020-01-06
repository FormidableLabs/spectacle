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

class Preview extends React.Component {
  render() {
    const { previewObj } = this.props;

    return (
      <OuterWrapper>
        <Wrapper>
          <SectionTitle>Code Preview</SectionTitle>
          <BodyCopy>{previewObj.description}</BodyCopy>
          <Video autoPlay muted loop poster="./static/bg-still.png">
            <source src="./static/bg-demo.webm" type="video/webm" />
            <source src="./static/bg-demo.mp4" type="video/mp4" />
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
