import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import * as path from 'path';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { useBasepath } from 'react-static';
import { useMarkdownTree, useMarkdownPage } from 'react-static-plugin-md-pages';
import { FeaturedBadge } from 'formidable-oss-badges';

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

const HeroBadgeLink = styled(Link)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: ${p => p.theme.spacing.sm};
  align-self: center;
`;

const HeroBadgeWrapper = styled.div`
  display: none;
  width: ${p => p.theme.layout.logo};
  height: ${p => p.theme.layout.logo};
  margin-bottom: 1rem;
  @media ${p => p.theme.media.sm} {
    display: block;
  }
`;

export const SidebarStyling = ({ children, sidebarOpen, closeSidebar }) => {
  const basepath = useBasepath() || '';
  const homepage = basepath ? `/${basepath}/` : '/';

  // A hack for compatibility with react-static-plugin-md
  // We need to remove the "Index" index from the list of avail headers
  const cleanChildren =
    children &&
    children.reduce((acc, curr) => {
      // index.md is given a key of 'docs'
      if (curr.key !== 'docs') {
        acc.push(curr);
      }

      return acc;
    }, []);

  return (
    <>
      <SidebarStripes />
      <SidebarContainer hidden={!sidebarOpen} onClick={closeSidebar}>
        <SidebarWrapper>
          <HeroBadgeLink to={homepage}>
            <HeroBadgeWrapper>
              <FeaturedBadge name="spectacle" />
            </HeroBadgeWrapper>
          </HeroBadgeLink>
          <ContentWrapper>{cleanChildren}</ContentWrapper>
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
  const basepath = useBasepath();
  const baseURL = basepath ? `/${basepath}` : '';
  const sidebarItems = useMemo(() => {
    if (!currentPage || !tree || !tree.children || !location) {
      return null;
    }

    let children = tree.children;
    if (tree.frontmatter && tree.originalPath) {
      children = [{ ...tree, children: undefined }, ...children];
    }

    return children.map(page => {
      const pageChildren = page.children || [];

      const to = pageChildren.length
        ? `${baseURL}/${pageChildren[0].path}/`
        : `${baseURL}/${page.path}/`;

      const isActive = pageChildren.length
        ? pageChildren.filter(ch => location.pathname.includes(ch.path)).length
        : location.pathname.includes(page.path);

      return (
        <React.Fragment key={page.key}>
          <SidebarNavItem to={to} isActive={() => isActive}>
            {page.frontmatter.title}
            {pageChildren.length ? <ChevronItem /> : null}
          </SidebarNavItem>

          {pageChildren.length && isActive ? (
            <SidebarNavSubItemWrapper>
              {pageChildren.map(childPage => (
                <SidebarNavSubItem
                  isActive={() => childPage.path === currentPage.path}
                  to={`${baseURL}/${childPage.path}/`}
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
