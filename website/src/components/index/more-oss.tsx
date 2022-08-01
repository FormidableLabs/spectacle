import React from 'react';
import BodyCopy from '@site/src/components/global/body-copy';
import { OSSBadge } from '@site/src/components/global/oss-badge';
import Button from '@site/src/components/global/button';
import SecondaryTitle from '@site/src/components/global/secondary-title';
import SectionTitle from '@site/src/components/global/section-title';
import Stack from '@site/src/components/global/stack';
import Wrapper from '@site/src/components/global/wrapper';

import styles from './more-oss.module.scss';

type ProductItem = {
  title: string;
  description: JSX.Element;
  abbreviation: string;
  color: string;
  link: string;
  light?: string;
};

interface Meta {
  theme: string;
  noMargin: boolean;
  noPadding: boolean;
}

function Product({
  title,
  description,
  abbreviation,
  color,
  link,
  light
}: ProductItem) {
  const card = {
    title,
    description,
    abbreviation,
    color,
    link,
    light
  };

  return (
    <div key={title} className={styles.ossCard}>
      <div className={styles.ossBadgeContainer}>
        <OSSBadge project={card} hoverable />
      </div>
      <div className={styles.ossCopyContainer}>
        <a href={link} target="_blank" rel="noopener noreferrer">
          <SecondaryTitle
            className={styles.ossTitle}
            light={light === 'Light' || light === 'Color'}
          >
            {title}
          </SecondaryTitle>
        </a>
        <BodyCopy
          className={styles.ossDescription}
          light={light === 'Light' || light === 'Color'}
        >
          {description}
        </BodyCopy>
      </div>
    </div>
  );
}

export default function MoreOSS({ content }): JSX.Element {
  const {
    meta,
    title,
    longText,
    productList,
    buttonText,
    buttonUrl
  }: {
    meta: Meta;
    title: string;
    longText: string;
    productList: ProductItem[];
    buttonText: string;
    buttonUrl: string;
  } = content;

  const isLightTheme = meta.theme === 'Light' || meta.theme === 'Color';

  return (
    <Wrapper
      noMargin={meta.noMargin}
      noPadding={meta.noPadding}
      background={meta.theme}
    >
      <Stack>
        <SectionTitle light={isLightTheme}>{title}</SectionTitle>
        {longText && <BodyCopy light={isLightTheme}>{longText}</BodyCopy>}
        <div className={styles.ossCardContainer}>
          {productList.map((props, idx) => (
            <Product key={idx} light={meta.theme} {...props} />
          ))}
        </div>
        <Button as="href" light={isLightTheme} to={buttonUrl}>
          {buttonText}
        </Button>
      </Stack>
    </Wrapper>
  );
}
