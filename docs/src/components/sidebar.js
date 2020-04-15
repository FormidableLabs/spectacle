import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import * as path from 'path';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { useBasepath } from 'react-static';
import { useMarkdownTree, useMarkdownPage } from 'react-static-plugin-md-pages';
import sidebarLogo from '../static/svgs/logo-sidebar.svg';

import {
  ChevronItem,
  SidebarContainer,
  SidebarNavItem,
  SidebarNavSubItem,
  SidebarNavSubItemWrapper,
  SidebarStripes,
  SidebarWrapper
} from './navigation';

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: ${p => p.theme.spacing.xs};
  padding-bottom: ${p => p.theme.spacing.lg};
`;

const HeroLogoLink = styled(Link)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: ${p => p.theme.spacing.sm};
  align-self: center;
`;

const HeroLogo = styled.img.attrs(() => ({
  src: sidebarLogo,
  alt: 'spectacle'
}))`
  display: none;
  width: ${p => p.theme.layout.logo};
  height: ${p => p.theme.layout.logo};
  @media ${p => p.theme.media.sm} {
    display: block;
  }
`;

export const relative = (from, to) => {
  if (!from || !to) return null;
  let [toPath, hash] = to.split('#');
  let pathname = path.relative(path.dirname(from), toPath);
  if (!pathname)
    pathname = path.join(path.relative(from, toPath), path.basename(toPath));
  if (from.endsWith('/')) pathname = '../' + pathname + '/';
  if (!pathname.endsWith('/')) pathname += '/';
  if (hash) pathname += `#${hash}`;
  return { pathname };
};

export const SidebarStyling = ({ children, sidebarOpen, closeSidebar }) => {
  const basepath = useBasepath() || '';
  const homepage = basepath ? `/${basepath}/` : '/';

  return (
    <>
      <SidebarStripes />
      <SidebarContainer hidden={!sidebarOpen} onClick={closeSidebar}>
        <SidebarWrapper>
          <HeroLogoLink to={homepage}>
            <HeroLogo />
          </HeroLogoLink>
          <ContentWrapper>{children}</ContentWrapper>
        </SidebarWrapper>
      </SidebarContainer>
    </>
  );
};

SidebarStyling.propTypes = {
  children: PropTypes.node,
  sidebarOpen: PropTypes.bool.isRequired,
  closeSidebar: PropTypes.func.isRequired
};

const Sidebar = props => {
  const currentPage = useMarkdownPage();
  const location = useLocation();
  const tree = useMarkdownTree();

  const sidebarItems = useMemo(() => {
    if (!currentPage || !tree || !tree.children || !location) {
      return null;
    }

    const pathname = location.pathname.endsWith('/')
      ? currentPage.path + '/'
      : currentPage.path;

    let children = tree.children;
    if (tree.frontmatter && tree.originalPath) {
      children = [{ ...tree, children: undefined }, ...children];
    }

    return children.map(page => {
      const pageChildren = page.children || [];

      const isActive = pageChildren.length
        ? currentPage.path.startsWith(page.path)
        : currentPage.path === page.path;

      return (
        <React.Fragment key={page.key}>
          <SidebarNavItem
            to={relative(pathname, page.path)}
            isActive={() => isActive}
          >
            {page.frontmatter.title}
            {pageChildren.length ? <ChevronItem /> : null}
          </SidebarNavItem>

          {pageChildren.length && isActive ? (
            <SidebarNavSubItemWrapper>
              {pageChildren.map(childPage => (
                <SidebarNavSubItem
                  isActive={() => childPage.path === currentPage.path}
                  to={relative(pathname, childPage.path)}
                  key={childPage.key}
                >
                  {childPage.frontmatter.title}
                </SidebarNavSubItem>
              ))}
            </SidebarNavSubItemWrapper>
          ) : null}
        </React.Fragment>
      );
    });
  }, [currentPage, tree, location]);

  return <SidebarStyling {...props}>{sidebarItems}</SidebarStyling>;
};

export default Sidebar;
