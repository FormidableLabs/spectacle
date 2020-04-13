import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useBasepath } from 'react-static';

import formidableLogo from '../../assets/logo_formidable_white.png';

const Fixed = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 1;
  box-sizing: border-box;
  height: ${p => p.theme.layout.header};
  background: ${p => p.theme.colors.bg};
  padding: 0 ${p => p.theme.spacing.md};
  box-shadow: ${p => p.theme.shadows.header};
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  max-width: ${p => p.theme.layout.page};
  margin: 0 auto;
  padding-top: 2px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const BlockLink = styled.a`
  display: flex;
  color: inherit;
  text-decoration: none;
`;

const ProjectWording = styled(Link)`
  display: flex;
  text-decoration: none;
  font-family: ${p => p.theme.fonts.code};
  color: ${p => p.theme.colors.accentLight};
  margin-left: 0.6ch;
  font-size: 1.9rem;
`;

const FormidableLogo = styled.img.attrs(() => ({
  src: formidableLogo
}))`
  height: 2.8rem;
  position: relative;
  top: -0.1rem;
`;

const Header = () => {
  const basepath = useBasepath() || '';
  const homepage = basepath ? `/${basepath}/` : '/';

  return (
    <Fixed>
      <Wrapper>
        <BlockLink href="https://formidable.com/">
          <FormidableLogo />
        </BlockLink>
        <ProjectWording to={homepage}>Spectacle</ProjectWording>
      </Wrapper>
    </Fixed>
  );
};

export default Header;
