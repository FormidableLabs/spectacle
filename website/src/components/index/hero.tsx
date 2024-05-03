import React from 'react';
import Link from '@docusaurus/Link';
import NpmCopy from '@site/src/components/global/npm-copy';
import Wrapper from '@site/src/components/global/wrapper';
import styles from './hero.module.scss';
import { FeaturedBadge } from 'formidable-oss-badges';

type NavItem = {
  text: string;
  url: string;
};

function NavItem({ text, url }: NavItem) {
  const isExternalUrl = /^(http|https):\/\//.test(url);
  const isDocsUrl = /^docs\//.test(url);
  return (
    <li>
      {isExternalUrl && (
        <a title={text} href={url} target="_blank" rel="noopener noreferrer">
          {text}
        </a>
      )}
      {isDocsUrl && <Link to={url}>{text}</Link>}
    </li>
  );
}

const Hero = ({ content }) => {
  const {
    title,
    tagline,
    installScript,
    featureButtonText,
    featureButtonUrl,
    navList
  }: {
    title: string;
    tagline: string;
    installScript: string;
    featureButtonText: string;
    featureButtonUrl: string;
    navList: NavItem[];
  } = content;

  return (
    <Wrapper
      noPadding={true}
      background="transparent"
      className={styles.wrapper}
    >
      <div className={styles.hero}>
        <div className={styles.badge}>
          <FeaturedBadge name="spectacle" />
        </div>
        <div className={styles.heroBody}>
          <h1 className={styles.heroBody__title}>{title}</h1>
          <p className={styles.heroBody__tagline}>{tagline}</p>
          <div className={styles.heroBody__buttons}>
            <NpmCopy text={installScript} />
          </div>
          <ul className={styles.heroNav}>
            {navList.map((item, idx) => (
              <NavItem key={idx} {...item} />
            ))}
          </ul>
        </div>
      </div>
    </Wrapper>
  );
};

export default Hero;
