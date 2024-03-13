import React from 'react';
import Header from '@site/src/components/global/header';
import Footer from '@site/src/components/global/footer';
import Features from '@site/src/components/index/features';
import Preview from '@site/src/components/index/preview';
import GetStarted from '@site/src/components/index/get-started';
import MoreOSS from '@site/src/components/index/more-oss';
import content from '@site/src/components/index/_content';

import styles from './index.module.scss';
import Head from '@docusaurus/Head';

export default function Home() {
  const { header, footer, features, preview, getStarted, oss } = content;

  return (
    <div className={styles.container}>
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
      <Header content={header} />
      <main>
        <Features content={features} />
        <Preview content={preview} />
        <GetStarted content={getStarted} />
        <MoreOSS content={oss} />
      </main>
      <Footer content={footer} />
    </div>
  );
}
