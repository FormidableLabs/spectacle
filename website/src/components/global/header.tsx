import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Hero from '@site/src/components/index/hero';
import styles from './header.module.scss';

export default function Header({ content }) {
  const { siteConfig } = useDocusaurusContext();
  const {
    formidableBadge,
    hero
  }: {
    formidableBadge: boolean;
    hero: {
      title: string;
      tagline: string;
      installScript: string;
      featureButtonText: string;
      featureButtonUrl: string;
      navList: {
        text: string;
        url: string;
      };
    };
  } = content;

  const triangleSrc = useBaseUrl('/svg/header-triangle.svg');
  const logoSrc = useBaseUrl('/svg/formidable-icon-white.svg');

  return (
    <header className={styles.header}>
      {formidableBadge && (
        <>
          <img
            src={triangleSrc}
            alt=""
            width="300px"
            height="309px"
            className={styles.triangle}
          />
          <a
            href={siteConfig.url}
            title="Formidable"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.badge}
          >
            <p className={styles.badge__text}>Another oss project by</p>
            <img
              src={logoSrc}
              alt="Formidable Logo"
              width="70px"
              height="90px"
              className={styles.badge__logo}
            />
          </a>
        </>
      )}
      <Hero content={hero} />
    </header>
  );
}
