import React from 'react';
import styled from 'styled-components';
import { BodyCopy } from '@site/src/components/global/body-copy';
import { OSSBadge } from '@site/src/components/global/oss-badge';
import { Button } from '@site/src/components/global/button';
import { SecondaryTitle } from '@site/src/components/global/secondary-title';
import { SectionTitle } from '@site/src/components/global/section-title';
import { Stack } from '@site/src/components/global/stack';
import { Wrapper } from '@site/src/components/global/wrapper';

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

const OSSCardContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(4, 1fr);
  grid-gap: 4rem;
  width: calc(100% - 4rem);
  max-width: 75%;
  margin-left: auto;
  margin-right: auto;
  @media ${(p) => p.theme.media.sm} {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    max-width: 116rem;
  }
`;

const OSSCard = styled.div`
  text-align: left;
  display: flex;
  flex-direction: column;
  align-items: center;
  > * {
    margin-top: 0;
    margin-bottom: 0;
  }
  > * + * {
    margin-top: 1rem;
  }
  @media ${(p) => p.theme.media.sm} {
    flex-direction: row;
    justify-content: space-between;
    > * {
      margin-left: 0;
      margin-right: 0;
    }
    > * + * {
      margin-top: 0;
      margin-left: 3rem;
    }
  }
`;

const OSSBadgeContainer = styled.div`
  display: flex;
  flex: 1;

  a:hover {
    background: none;
    text-decoration: none;
  }
`;

const OSSCopyContainer = styled.div`
  display: flex;
  flex: 2;
  flex-direction: column;
  > * {
    margin-top: 0;
    margin-bottom: 0;
  }
  > * + * {
    margin-top: 2rem;
  }
`;

const OSSTitle = styled(SecondaryTitle)`
  color: ${(p) =>
    p.light ? p.theme.colors.textDark : p.theme.colors.textLight};
  transition: opacity 0.3s ease-out;
  margin: 0;
  &:hover {
    opacity: 0.7;
  }
  @media ${(p) => p.theme.media.sm} {
    text-align: left;
  }
`;

const OSSDescription = styled(BodyCopy)`
  margin: 0 auto;
  color: ${(p) => (p.light ? p.theme.colors.text : p.theme.colors.textLight)};
  @media ${(p) => p.theme.media.sm} {
    text-align: left;
  }
`;

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
    <OSSCard key={title}>
      <OSSBadgeContainer>
        <OSSBadge project={card} />
      </OSSBadgeContainer>
      <OSSCopyContainer>
        <a href={link} target="_blank" rel="noopener noreferrer">
          <OSSTitle light={light === 'Light' || light === 'Color'}>
            {title}
          </OSSTitle>
        </a>
        <OSSDescription light={light === 'Light' || light === 'Color'}>
          {description}
        </OSSDescription>
      </OSSCopyContainer>
    </OSSCard>
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
      <Stack spacingMobile={3} spacingTablet={5}>
        <SectionTitle light={isLightTheme}>{title}</SectionTitle>
        {longText && <BodyCopy light={isLightTheme}>{longText}</BodyCopy>}
        <OSSCardContainer>
          {productList.map((props, idx) => (
            <Product key={idx} light={meta.theme} {...props} />
          ))}
        </OSSCardContainer>
        <Button
          as="a"
          target="_blank"
          rel="noopener noreferrer"
          light={isLightTheme}
          href={buttonUrl}
        >
          {buttonText}
        </Button>
      </Stack>
    </Wrapper>
  );
}
