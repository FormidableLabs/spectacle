import React from 'react';
import Hero from '../screens/home/hero';
import bgImg from '../static/bg_hero_feather.jpg';
import headerTriangle from '../static/svgs/header-triangle.svg';
import logoFormidableWhite from '../static/svgs/logo_formidable_white.png';
import styled from 'styled-components';

const Container = styled.header`
  background: #3b3b3b;
  background-image: linear-gradient(14deg, #404a5f, #7f526a);
  @media (min-width: 768px) {
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
  background-size: cover;
  color: white;
  height: auto;
  padding: 0 0 9rem;
  width: 100%;
  position: relative;
`;

const Triangle = styled.img`
  position: absolute;
  display: block;
  left: 0;
  top: 0;
  width: 13.7rem;
  @media (min-width: 768px) {
    width: 22.3rem;
  }
  @media (min-width: 1024px) {
    width: 28.3rem;
  }
`;

const HeaderContainer = styled.a`
  display: flex;
  position: absolute;
  left: 1.8rem;
  top: 1.3rem;
  font-size: 0.8rem;
  @media (min-width: 768px) {
    left: 3.3rem;
    top: 1.7rem;
    font-size: 1.2rem;
  }
  @media (min-width: 1024px) {
    left: 5.3rem;
    top: 3.7rem;
  }
  width: 12rem;
  flex-direction: column;
  color: #ffffff;
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
  margin-top: 1rem;
  width: 3.3rem;
  @media (min-width: 768px) {
    width: 4.8rem;
  }
  z-index: 1;
`;

export const Header = () => (
  <Container>
    <Triangle src={headerTriangle} />
    <HeaderContainer href="https://formidable.com" title="Formidable">
      <HeaderText>Another oss project by </HeaderText>
      <HeaderLogo src={logoFormidableWhite} alt="Formidable Logo" />
    </HeaderContainer>
    <Hero />
  </Container>
);
