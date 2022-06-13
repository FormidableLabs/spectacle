import React from 'react';
import styled from 'styled-components';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Hero from '@site/src/components/home/hero';
import bgImg from '@site/static/img/bg_hero_feather.jpg';
import headerTriangle from '@site/static/svg/header-triangle.svg';
import logoFormidableWhite from '@site/static/img/logo_formidable_white.png';

type Triangle = {
  src: string;
};

const Container = styled.header`
  padding: 0px 0px 14rem;
  color: ${(p) => p.theme.colors.textLight};
  background: ${(p) => p.theme.colors.textDark};
  background-image: linear-gradient(14deg, #404a5f, #7f526a);
  background-size: cover;
  @media ${(p) => p.theme.media.sm} {
    background-image: url(${bgImg}),
      linear-gradient(
        194deg,
        #77414b,
        #564c60 18%,
        #0d4a5d 73%,
        #023340,
        #023340,
        #023340
      );
  }
`;

const Triangle = styled.img<Triangle>`
  position: absolute;
  left: -0.7rem;
  top: -0.3rem;
  width: 20rem;
  @media ${(p) => p.theme.media.sm} {
    width: 26rem;
  }
  @media ${(p) => p.theme.media.md} {
    width: 30rem;
  }
`;

const HeaderContainer = styled.a`
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 2rem;
  top: 1.5rem;
  font-size: 0.8rem;
  color: ${(p) => p.theme.colors.textLight};
  @media ${(p) => p.theme.media.sm} {
    left: 3.5rem;
    top: 2rem;
    font-size: 1.2rem;
  }
  @media ${(p) => p.theme.media.md} {
    left: 4rem;
    top: 3rem;
  }
  > * {
    margin-top: 0;
    margin-bottom: 0;
  }
  > * + * {
    margin-top: 1rem;
  }
`;

const HeaderText = styled.p`
  text-transform: uppercase;
  margin: 0;
  font-family: inherit;
  font-size: inherit;
  line-height: 1.5;
  letter-spacing: 0.86px;
  max-width: 10rem;
`;

const HeaderLogo = styled.img`
  width: 4rem;
  @media ${(p) => p.theme.media.sm} {
    width: 6rem;
  }
`;

export default function Header(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Container>
      <Triangle src={headerTriangle} />
      <HeaderContainer
        href="https://formidable.com"
        title="Formidable"
        target="_blank"
        rel="noopener noreferrer"
      >
        <HeaderText>Another oss project by</HeaderText>
        <HeaderLogo src={logoFormidableWhite} alt="Formidable Logo" />
      </HeaderContainer>
      <Hero />
    </Container>
  );
}
