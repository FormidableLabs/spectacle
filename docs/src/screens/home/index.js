import React from 'react';
import content from './_content';
import { Header } from '../../components/header';
import { Footer } from '../../components/footer';
import Features from './features';
import Preview from './preview';
import GetStarted from './get-started';
import MoreOSS from './more-oss';

const Home = () => (
  <>
    <Header />
    <Features features={content.features} />
    <Preview preview={content.preview} />
    <GetStarted getStarted={content.getStarted} />
    <MoreOSS oss={content.oss} />
    <Footer />
  </>
);

export default Home;
