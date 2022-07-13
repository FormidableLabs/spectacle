import React from 'react';
import styled from 'styled-components';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { Wrapper } from '@site/src/components/global/wrapper';

type Meta = {
  theme: string;
  noMargin: boolean;
  noPadding: boolean;
};

const FooterContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media ${({ theme }) => theme.media.md} {
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
  flex-direction: column;

  @media ${({ theme }) => theme.media.md} {
    flex-direction: row;
  }
`;

const FooterLogo = styled.img`
  width: 20rem;
`;

const FooterLinks = styled.ul`
  font-size: 1.4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  list-style: none;
  padding: 0;
  text-transform: uppercase;
  margin: 2rem auto;

  > * {
    margin-top: 0;
    margin-bottom: 0;
  }

  > * + * {
    margin-top: 1rem;
    margin-left: 0;
  }

  @media ${({ theme }) => theme.media.sm} {
    flex-direction: row;

    > * + * {
      margin-top: 0;
      margin-left: 4rem;
    }
  }

  @media ${({ theme }) => theme.media.md} {
    flex-direction: column;
    align-items: flex-start;
    margin: 0 6rem 0 auto;

    > * + * {
      margin-top: 2rem;
      margin-left: 0;
    }
  }

  & li a {
    color: ${({ theme }) => theme.colors.buttonLight};
    letter-spacing: 0.1rem;
    transition: color 0.2s ease-out;

    :hover {
      color: ${({ theme }) => theme.colors.buttonLightHover};
    }
  }
`;

const FooterDescription = styled.p`
  font-size: 1.3rem;
  line-height: 1.6;
  max-width: 56rem;
  margin: 0 auto;
  text-align: center;
  color: ${({ theme }) => theme.colors.textLight};

  @media ${({ theme }) => theme.media.md} {
    text-align: left;
    font-size: 1.4rem;
    line-height: 1.6;
  }

  & a {
    color: ${({ theme }) => theme.colors.buttonLight};
    transition: color 0.2s ease-out;

    :hover {
      color: ${({ theme }) => theme.colors.buttonLightHover};
    }
  }
`;

const FooterCopyright = styled.p`
  font-size: 1.3rem;
  line-height: 1.6;
  width: 100%;
  margin: 2rem auto 0;
  text-align: center;
  color: ${({ theme }) => theme.colors.textLight};

  @media ${({ theme }) => theme.media.md} {
    text-align: left;
    font-size: 1.4rem;
  }

  & a {
    margin-left: 0;
    display: block;
    color: ${({ theme }) => theme.colors.buttonLight};
    transition: color 0.2s ease-out;

    @media ${({ theme }) => theme.media.md} {
      margin-left: 6rem;
      display: inline-block;
    }

    :hover {
      color: ${({ theme }) => theme.colors.buttonLightHover};
    }
  }
`;

function romanize(num) {
  if (!+num) return false;
  const digits = String(+num).split('');
  const key = [
    '',
    'C',
    'CC',
    'CCC',
    'CD',
    'D',
    'DC',
    'DCC',
    'DCCC',
    'CM',
    '',
    'X',
    'XX',
    'XXX',
    'XL',
    'L',
    'LX',
    'LXX',
    'LXXX',
    'XC',
    '',
    'I',
    'II',
    'III',
    'IV',
    'V',
    'VI',
    'VII',
    'VIII',
    'IX'
  ];
  let roman = '';
  let i = 3;
  while (i--) roman = (key[+digits.pop() + i * 10] || '') + roman;
  return Array(+digits.join('') + 1).join('M') + roman;
}

export default function Footer({ content }) {
  const { meta }: { meta: Meta } = content;

  const logoSrc = useBaseUrl('/svg/formidable-logo-white.svg');

  return (
    <Wrapper noPadding={false} noMargin={false} background={meta.theme}>
      <FooterContainer>
        <FooterLeft>
          <a
            href="https://formidable.com"
            title="Formidable"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textAlign: 'center' }}
          >
            <FooterLogo src={logoSrc} alt="Formidable Logo" />
          </a>
          <FooterLinks>
            <li>
              <a
                href="https://formidable.com/open-source"
                title="Open Source"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open Source
              </a>
            </li>
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
          Formidable is a global design and engineering consultancy, and
          open-source software organization, specializing in digital products
          and transformation. The firm has location hubs in Seattle, London,
          Toronto, Denver, Atlanta, and Phoenix with remote consultants
          worldwide. Since 2013, its team has worked with companies ranging in
          size from startups to Fortune 100s to build quality digital products
          and level-up engineering and design teams. For more information please
          visit <a href="https://www.formidable.com">formidable.com</a>.
        </FooterDescription>
      </FooterContainer>
      <FooterCopyright>
        © {romanize(new Date().getFullYear())} Formidable Labs, LLC.
      </FooterCopyright>
    </Wrapper>
  );
}
