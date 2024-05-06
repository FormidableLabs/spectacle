import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Features from '@site/src/components/index/features';
import Preview from '@site/src/components/index/preview';
import GetStarted from '@site/src/components/index/get-started';
import MoreOSS from '@site/src/components/index/more-oss';
import content from '@site/src/components/index/_content';

import Head from '@docusaurus/Head';
import Layout from '@theme/Layout';
import Hero from '../components/index/hero';

export default function Home() {
  const { header, features, preview, getStarted, oss } = content;
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <Head>
        <meta
          name="description"
          content="A React.js based library for creating sleek presentations using JSX syntax."
        />
        <meta property="og:title" content="spectacle Documentation" />
        <meta property="og:site_name" content="spectacle Documentation" />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="http://commerce.nearform.com/open-source/spectacle/"
        />
        <meta
          property="og:description"
          content="A React.js based library for creating sleek presentations using JSX syntax."
        />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        <title>spectacle Documentation</title>
      </Head>
      <Hero content={header.hero} />
      <main>
        <Features content={features} />
        <Preview content={preview} />
        <GetStarted content={getStarted} />
        <MoreOSS content={oss} />
      </main>
    </Layout>
  );
}
