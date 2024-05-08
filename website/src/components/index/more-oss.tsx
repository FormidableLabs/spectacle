import React from 'react';
import BodyCopy from '@site/src/components/global/body-copy';
import Button from '@site/src/components/global/button';
import SecondaryTitle from '@site/src/components/global/secondary-title';
import SectionTitle from '@site/src/components/global/section-title';
import Stack from '@site/src/components/global/stack';
import Wrapper from '@site/src/components/global/wrapper';

import styles from './more-oss.module.scss';
import {
  featuredBadgeNames,
  FeaturedBadge,
  ProjectBadge
} from 'formidable-oss-badges';

type ProductItem = {
  title: string;
  description: string;
  abbreviation: string;
  color: string;
  link: string;
  theme: string;
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
  theme
}: ProductItem) {
  const card = {
    title,
    description,
    abbreviation,
    color,
    link,
    theme
  };

  const badge = (card: ProductItem) => {
    if (featuredBadgeNames.includes(card.title.toLowerCase())) {
      // @ts-ignore
      return <FeaturedBadge name={card.title} description={card.description} />;
    }
    return (
      <ProjectBadge
        abbreviation={card.abbreviation}
        description={card.title}
        color="#80EAC7"
      />
    );
  };

  return (
    <div key={title} className={styles.ossCard}>
      <div className={styles.ossBadgeContainer}>{badge(card)}</div>
      <div className={styles.ossCopyContainer}>
        <a href={link} target="_blank" rel="noopener noreferrer">
          <SecondaryTitle className={styles.ossTitle} theme={theme}>
            {title}
          </SecondaryTitle>
        </a>
        <BodyCopy className={styles.ossDescription} theme={theme}>
          {description}
        </BodyCopy>
      </div>
    </div>
  );
}

export default function MoreOSS({ content }) {
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

  return (
    <Wrapper
      noMargin={meta.noMargin}
      noPadding={meta.noPadding}
      background={meta.theme}
    >
      <Stack>
        <SectionTitle theme={meta.theme}>{title}</SectionTitle>
        {longText && <BodyCopy theme={meta.theme}>{longText}</BodyCopy>}
        <div className={styles.ossCardContainer}>
          {productList.map((props, idx) => (
            <Product key={idx} theme={meta.theme} {...props} />
          ))}
        </div>
        <Button as="href" theme={meta.theme} to={buttonUrl}>
          {buttonText}
        </Button>
      </Stack>
    </Wrapper>
  );
}
