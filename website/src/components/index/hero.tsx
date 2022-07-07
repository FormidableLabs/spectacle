import React from 'react';
import styled from 'styled-components';
import Link from '@docusaurus/Link';
import { OSSBadge } from '@site/src/components/global/oss-badge';
import NpmCopy from '@site/src/components/global/npm-copy';
import { Wrapper } from '@site/src/components/global/wrapper';

type NavItem = {
  text: string;
  url: string;
};

const HeroContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5rem;
  width: 100%;
  > * {
    margin-top: 0;
    margin-bottom: 0;
  }
  > * + * {
    margin-top: 2rem;
  }
  @media ${({ theme }) => theme.media.sm} {
    display: grid;
    grid-template-areas:
      'a . b'
      'a . b'
      'a . b'
      'a . c'
      'd d d';
    margin-top: 20rem;
    padding: 0 2rem;
    > * + * {
      margin-top: 0;
    }
  }
`;

const HeroTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.h1Small};
  letter-spacing: 0.1rem;
  text-align: center;
  @media ${({ theme }) => theme.media.sm} {
    font-size: ${({ theme }) => theme.fontSizes.h1};
    text-align: left;
  }
`;

const HeroBody = styled.p`
  font-family: Helvetica;
  font-size: 1.4rem;
  line-height: 2.2rem;
  max-width: 30rem;
  text-align: center;
  @media ${({ theme }) => theme.media.sm} {
    font-size: 2rem;
    line-height: 2.8rem;
    max-width: none;
    text-align: left;
  }
`;

const HeroNavList = styled.ul`
  border-top: ${({ theme }) => `0.2rem solid ${theme.colors.textLight}`};
  display: flex;
  justify-content: center;
  list-style: none;
  padding: 2rem 0 0;
  text-align: center;
  @media ${({ theme }) => theme.media.sm} {
    grid-area: d;
    width: 100%;
    margin-top: 2rem;
  }
  @media ${({ theme }) => theme.media.md} {
    grid-area: c;
    margin: 2.2rem 0 0;
    width: 100%;
    max-width: 52rem;
  }
  > * {
    margin-left: 0;
    margin-right: 0;
  }
  > * + * {
    margin-left: 4rem;
  }
  & li a {
    color: ${({ theme }) => theme.colors.textLight};
    font-size: 1.7rem;
    letter-spacing: 0.1rem;
    transition: opacity 0.4s ease-out;
    text-transform: uppercase;
    text-decoration: none;
    &:hover {
      color: ${({ theme }) => theme.colors.buttonLightHover};
    }
  }
`;

const HeroButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  > * {
    margin-top: 0;
    margin-bottom: 0;
  }
  > * + * {
    margin-top: 2rem;
  }
  @media ${({ theme }) => theme.media.md} {
    align-items: center;
    flex-direction: row;
    > * {
      margin-left: 0;
      margin-right: 0;
    }
    > * + * {
      margin-top: 0;
      margin-left: 2rem;
    }
  }
`;

const DocumentationButton = styled(Link)`
  width: 30rem;
  height: 4rem;
  font-size: 1.4rem;
  background: ${({ theme }) => theme.colors.buttonLight};
  transition: background 0.25s ease-out;
  line-height: 4rem;
  text-align: center;
  text-transform: uppercase;
  text-decoration: none;
  letter-spacing: 0.1rem;
  color: ${({ theme }) => theme.colors.textDark};
  border: 0;
  border-radius: ${({ theme }) => theme.borderRadius};
  @media ${({ theme }) => theme.media.md} {
    margin-top: 0;
    width: 18rem;
  }
  &:hover {
    color: ${({ theme }) => theme.colors.textDark};
    background: ${({ theme }) => theme.colors.buttonLightHover};
  }
`;

const HeroBodyAndButtons = styled.div`
  > * {
    margin-top: 0;
    margin-bottom: 0;
  }
  > * + * {
    margin-top: 2rem;
  }
  @media ${({ theme }) => theme.media.sm} {
    grid-area: b;
    max-width: 52rem;
    margin-left: 6rem;
  }
  @media ${({ theme }) => theme.media.md} {
    margin-left: 0rem;
  }
`;

const NavItemExternal = styled.a`
  &:hover {
    background: none;
  }
`;

const NavItemInternal = styled(Link)`
  &:hover {
    background: none;
  }
`;

function NavItem({ text, url }: NavItem) {
  const isExternalUrl = /^(http|https):\/\//.test(url);
  const isDocsUrl = /^docs\//.test(url);
  return (
    <li>
      {isExternalUrl && (
        <NavItemExternal
          title={text}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {text}
        </NavItemExternal>
      )}
      {isDocsUrl && <NavItemInternal to={url}>{text}</NavItemInternal>}
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

  const badge: object = { title };

  return (
    <Wrapper noPadding={true} background="transparent">
      <HeroContent>
        <OSSBadge hoverable={false} project={badge} />
        <HeroBodyAndButtons>
          <HeroTitle>{title}</HeroTitle>
          <HeroBody>{tagline}</HeroBody>
          <HeroButtonsContainer>
            <NpmCopy text={installScript} />
            <DocumentationButton to={featureButtonUrl}>
              {featureButtonText}
            </DocumentationButton>
          </HeroButtonsContainer>
        </HeroBodyAndButtons>
        <HeroNavList>
          {navList.map((item, idx) => (
            <NavItem key={idx} {...item} />
          ))}
        </HeroNavList>
      </HeroContent>
    </Wrapper>
  );
};

export default Hero;
