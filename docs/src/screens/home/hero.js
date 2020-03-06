import React from 'react';
import { Link } from 'react-static';
import { Wrapper } from '../../components/wrapper';
import styled from 'styled-components';
import badge from '../../static/bg_hero_badge.png';
import NpmCopy from './npm-copy';

const HeroContent = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin-top: 5rem;
  padding: 0;
  position: relative;
  text-align: left;
  width: 100%;
  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 3fr 0.5fr 4fr;
    grid-template-rows: repeat(5, 1fr);
    grid-template-areas:
      'a . b'
      'a . b'
      'a . b'
      'a . c'
      'd d d';
    margin: 20rem 2rem 0;
  }
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  margin: 0 0 2rem;
  text-align: center;
  width: 100%;
  @media (min-width: 768px) {
    font-size: 5.8rem;
    margin: 4rem 0 2rem;
    text-align: left;
  }
`;

const HeroBody = styled.p`
  font-size: 1.4rem;
  line-height: 2.2rem;
  margin: 0 0 4rem;
  max-width: 30rem;
  text-align: left;
  width: 100%;
  @media (min-width: 768px) {
    font-size: 2rem;
    line-height: 2.8rem;
    max-width: 100%;
  }
`;

const HeroLogo = styled.img`
  max-width: 16rem;
  position: relative;
  @media (min-width: 768px) {
    max-width: 40rem;
    grid-area: a;
    align-self: flex-start;
  }
  @media (min-width: 1024px) {
    max-width: initial;
  }
`;

const HeroNavList = styled.ul`
  border-top: 0.2rem solid #707070;
  margin-top: 2.2rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  list-style: none;
  padding: 2rem 0 0;
  text-align: center;
  width: 100%;
  box-sizing: border-box;
  @media (min-width: 768px) {
    grid-area: d;
    margin: 2.2rem 6rem 0;
    width: calc(100% - 12rem);
  }
  @media (min-width: 1024px) {
    grid-area: c;
    margin: 2.2rem 0 0;
    width: 100%;
    border-top-color: #ffffff;
  }
  & li a {
    color: white;
    display: inline-block;
    font-size: 1.7rem;
    letter-spacing: 0.05em;
    margin: 0 2rem;
    transition: opacity 0.4s;
    text-transform: uppercase;
  }
  & li a:hover {
    color: #fc6986;
  }
`;

const HeroButtonsWrapper = styled.div`
  max-width: 100%;
  flex-direction: column;
  justify-content: space-between;
  display: flex;
  @media (min-width: 1024px) {
    flex-direction: row;
  }
  @media (max-width: 768px) {
    align-items: center;
  }
`;

const HeroDocsButton = styled(Link)`
  width: 30rem;
  margin-left: 0rem;
  height: 4rem;
  font-size: 14px;
  background: #ffffff;
  transition: background 0.4s;
  line-height: 4rem;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #383838;
  border: 0;
  margin-top: 1.2rem;
  @media (min-width: 768px) {
    margin-top: 2rem;
    width: 30rem;
  }
  @media (min-width: 1024px) {
    margin-top: 0;
    margin-left: 2rem;
    width: 18rem;
  }
  &:hover {
    background: #fc6986;
  }
`;

const HeroBodyAndButtons = styled.div`
  grid-area: b;
`;

class Hero extends React.Component {
  constructor() {
    super(...arguments);
  }

  render() {
    return (
      <Wrapper noPadding>
        <HeroContent>
          <HeroLogo src={badge} />
          <HeroBodyAndButtons>
            <HeroTitle>Spectacle</HeroTitle>
            <HeroBody>
              A React.js based library for creating sleek presentations using
              JSX syntax that gives you the ability to live demo your code.
            </HeroBody>
            <HeroButtonsWrapper>
              <NpmCopy text="npm install spectacle" />
              <HeroDocsButton prefetch to="/docs">
                Documentation
              </HeroDocsButton>
            </HeroButtonsWrapper>
          </HeroBodyAndButtons>
          <HeroNavList>
            <li>
              <Link prefetch to="/docs">
                Docs
              </Link>
            </li>
            <li>
              <a
                title="Issues"
                href="https://www.github.com/FormidableLabs/spectacle/issues"
                target="_blank"
                rel="noopener noreferrer"
              >
                Issues
              </a>
            </li>
            <li>
              <a
                title="GitHub"
                href="https://github.com/FormidableLabs/spectacle"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </li>
          </HeroNavList>
        </HeroContent>
      </Wrapper>
    );
  }
}

export default Hero;
