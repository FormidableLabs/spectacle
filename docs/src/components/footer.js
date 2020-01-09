import React from 'react';
import PropTypes from 'prop-types';
import { Wrapper } from './wrapper';
import styled from 'styled-components';
import logoFormidableWhite from '../static/svgs/logo_formidable_white.png';

const Container = styled.footer`
  background: #1f1f1f;
  color: white;
  display: flex;
  flex-direction: column;
  height: auto;
  padding: 9rem 6rem;
  @media (max-width: 768px) {
    padding: 6rem 4rem 8rem 3.5rem;
  }
  align-items: left;
`;

const FooterDescription = styled.p`
  flex: 2;
  font-size: 1.4rem;
  letter-spacing: 0.05rem;
  line-height: 1.6;
  margin: 2rem 0 0;
  max-width: 56rem;
  text-align: left;
  @media (min-width: 768px) {
    font-size: 1.5rem;
    margin: 0;
    min-width: auto;
  }
  & a {
    color: white;
    letter-spacing: 0.05em;
    transition: opacity 0.4s;
  }
  & a:hover {
    opacity: 0.7;
  }
  & a:visited {
    color: white;
  }
`;

const FooterLeft = styled.div`
  display: flex;
  flex: 1;
  padding: 0;
  text-align: left;
`;

const FooterLogo = styled.img`
  width: 7rem;
  margin-right: 2.7rem;
`;

const FooterLinks = styled.ul`
  font-size: 1.4rem;
  list-style: none;
  padding: 0px 8px;
  text-transform: uppercase;
  & li {
    margin-bottom: 1.4rem;
  }
  & a {
    color: white;
    letter-spacing: 0.05em;
    transition: opacity 0.4s;
  }
  & a:hover {
    opacity: 0.7;
  }
  & a:visited {
    color: white;
  }
`;

export const Footer = props => (
  <Container>
    <Wrapper noPadding noMargin={props.articleFooter}>
      <FooterLeft>
        <a href="https://formidable.com" title="Formidable">
          <FooterLogo src={logoFormidableWhite} alt="Formidable Logo" />
        </a>
        <FooterLinks>
          <li>
            <a href="https://formidable.com/contact/" title="Contact">
              Contact
            </a>
          </li>
          <li>
            <a href="https://formidable.com/careers/" title="Careers">
              Careers
            </a>
          </li>
        </FooterLinks>
      </FooterLeft>
      <FooterDescription>
        Formidable is a Seattle, Denver, and London-based engineering
        consultancy and open source software organization, specializing in
        React.js, React Native, GraphQL, Node.js, and the extended JavaScript
        ecosystem. For more information about Formidable, please visit{' '}
        <a href="https://www.formidable.com">formidable.com</a>.
      </FooterDescription>
    </Wrapper>
  </Container>
);

Footer.propTypes = {
  articleFooter: PropTypes.bool
};
