import React from 'react';
import Header from '@site/src/components/global/header';
import Footer from '@site/src/components/global/footer';
import Features from '@site/src/components/index/features';
import Preview from '@site/src/components/index/preview';
import GetStarted from '@site/src/components/index/get-started';
import MoreOSS from '@site/src/components/index/more-oss';
import content from '@site/src/components/index/_content';

import styles from './index.module.scss';

export default function Home() {
  const { header, footer, features, preview, getStarted, oss } = content;

  return (
    <div className={styles.container}>
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