import React from 'react';
import Features from './features';
import GetStarted from './get-started';
import MoreOSS from './more-oss';
import Preview from './preview';
import content from './_content';
import styled from 'styled-components';
import { Header } from '../../components/header';
import { Footer } from '../../components/footer';

const Container = styled.div`
  width: 100%;
`;

class Home extends React.Component {
  render() {
    return (
      <Container>
        <Header />
        <Features featureArray={content.features} />
        <Preview previewObj={content.preview} />
        <GetStarted getStartedObj={content.getStarted} />
        <MoreOSS ossArray={content.oss} />
        <Footer />
      </Container>
    );
  }
}

export default Home;
