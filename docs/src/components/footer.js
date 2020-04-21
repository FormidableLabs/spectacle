import React from 'react';
import styled from 'styled-components';

import { Wrapper } from './wrapper';
import { theme } from '../theme';
import logoFormidableWhite from '../assets/logo_formidable_white.png';

const FooterContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media ${p => p.theme.media.sm} {
    flex-direction: row;
  }

  > * {
    flex-basis: 50%;
  }
`;

const FooterLeft = styled.div`
  display: flex;
  padding: 0;
  text-align: left;
`;

const FooterLogo = styled.img`
  width: 10rem;
  margin-right: 3rem;
`;

const FooterLinks = styled.ul`
  font-size: 1.4rem;
  list-style: none;
  padding: 0 1rem;
  text-transform: uppercase;

  > * {
    margin-top: 0;
    margin-bottom: 0;
  }

  > * + * {
    margin-top: 1.5rem;
  }

  & a {
    color: ${p => p.theme.colors.textLight};
    letter-spacing: 0.1rem;
    transition: opacity 0.4s ease-out;
  }

  & a:hover {
    opacity: 0.7;
  }

  & a:visited {
    color: ${p => p.theme.colors.textLight};
  }
`;

const FooterDescription = styled.p`
  font-size: 1.4rem;
  letter-spacing: 0.05rem;
  line-height: 1.6;
  max-width: 56rem;
  text-align: left;
  color: ${p => p.theme.colors.textLight};
  margin: 0;

  & a {
    color: ${p => p.theme.colors.textLight};
    letter-spacing: 0.1rem;
    transition: opacity 0.3s ease-out;
  }

  & a:hover {
    opacity: 0.7;
  }

  & a:visited {
    color: ${p => p.theme.colors.textLight};
  }
`;

export const Footer = () => {
  return (
    <Wrapper background={theme.colors.bgDark}>
      <FooterContainer>
        <FooterLeft>
          <a
            href="https://formidable.com"
            title="Formidable"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FooterLogo src={logoFormidableWhite} alt="Formidable Logo" />
          </a>
          <FooterLinks>
            <li>
              <a
                href="https://formidable.com/contact/"
                title="Contact"
                target="_blank"
                rel="noopener noreferrer"
              >
                Contact
              </a>
            </li>
            <li>
              <a
                href="https://formidable.com/careers/"
                title="Careers"
                target="_blank"
                rel="noopener noreferrer"
              >
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
      </FooterContainer>
    </Wrapper>
  );
};
