import React from 'react';
import styled from 'styled-components';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Hero from '@site/src/components/index/hero';
import bgImg from '@site/static/img/hero-bg.jpg';

const Container = styled.header`
  padding: 0px 0px 14rem;
  color: ${({ theme }) => theme.colors.textLight};
  background: ${({ theme }) => theme.colors.textDark};
  background-image: linear-gradient(14deg, #404a5f, #7f526a);
  background-size: cover;
  @media ${({ theme }) => theme.media.sm} {
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

const Triangle = styled.img`
  position: absolute;
  left: -0.7rem;
  top: -0.3rem;
  width: 20rem;
  @media ${({ theme }) => theme.media.sm} {
    width: 26rem;
  }
  @media ${({ theme }) => theme.media.md} {
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
  color: ${({ theme }) => theme.colors.textLight};
  @media ${({ theme }) => theme.media.sm} {
    left: 3.5rem;
    top: 2rem;
    font-size: 1.2rem;
  }
  @media ${({ theme }) => theme.media.md} {
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
  :hover {
    color: ${({ theme }) => theme.colors.textLight};
    background: none;
    text-decoration: none;
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
  @media ${({ theme }) => theme.media.sm} {
    width: 7rem;
  }
`;

export default function Header({ content }): JSX.Element {
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
    <Container>
      {formidableBadge && (
        <>
          <Triangle src={triangleSrc} width="300px" height="309px" />
          <HeaderContainer
            href={siteConfig.url}
            title="Formidable"
            target="_blank"
            rel="noopener noreferrer"
          >
            <HeaderText>Another oss project by</HeaderText>
            <HeaderLogo
              src={logoSrc}
              alt="Formidable Logo"
              width="70px"
              height="90px"
            />
          </HeaderContainer>
        </>
      )}
      <Hero content={hero} />
    </Container>
  );
}
