import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withRouteData, withRouter, Link } from 'react-static';
import {
  SidebarNavItem,
  SidebarNavSubItem,
  SidebarContainer,
  SidebarWrapper
} from '../../components/navigation';
import closeButton from '../../static/svgs/x.svg';
import logoSidebar from '../../static/svgs/logo-sidebar.svg';
import constants from '../../constants';

const HeroLogo = styled.img`
  position: absolute;
  top: 3rem;
  left: 6rem;
  min-width: 14rem;

  @media (max-width: 768px) {
    display: ${props => (props.overlay ? '' : 'none')};
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 4rem 0rem 1rem 28px;
  height: auto;

  @media (max-width: 768px) {
    display: ${props => (props.overlay ? '' : 'none')};
  }
`;

const SubContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
`;

const Wrapper = styled.div`
  display: inline-block;
  padding-left: 2rem;
  position: relative;
`;

const CloseButton = styled.img`
  cursor: pointer;
  top: 1rem;
  right: 7rem;
  position: absolute;
  display: none;

  @media (max-width: 768px) {
    display: ${props => (props.overlay ? 'block' : 'none')};
    right: 1rem;
  }
`;

class Sidebar extends React.Component {
  renderSidebarItem(item) {
    const { tocArray } = this.props;
    const location = this.props.history.location;
    const currentPath = `/docs${item.path}` === location.pathname;
    // eslint-disable-next-line no-magic-numbers
    const subContent = tocArray.filter(toc => toc.level === 2);
    return (
      <Wrapper key={item.path}>
        <SidebarNavItem
          to={`/docs${item.path}`}
          replace
          key={item.title.split(' ').join('_')}
          isSelected={currentPath}
        >
          {item.title}
        </SidebarNavItem>
        {currentPath && !!subContent.length && (
          <SubContentWrapper>
            {subContent.map(sh => {
              const slug = `#${sh.content
                .split(' ')
                .join('-')
                .toLowerCase()}`;
              return (
                <SidebarNavSubItem
                  to={slug}
                  key={sh.content.split(' ').join('_')}
                  isSelected={slug === location.hash}
                >
                  {sh.content}
                </SidebarNavSubItem>
              );
            })}
          </SubContentWrapper>
        )}
      </Wrapper>
    );
  }

  render() {
    const { sidebarHeaders, overlay, closeSidebar } = this.props;
    return (
      <SidebarContainer>
        <SidebarWrapper overlay={overlay}>
          <CloseButton
            src={closeButton}
            alt="X"
            overlay={overlay}
            onClick={() => closeSidebar()}
          />
          <Link to={'/'}>
            <HeroLogo
              src={logoSidebar}
              alt="Formidable Logo"
              overlay={overlay}
            />
          </Link>
          <ContentWrapper overlay={overlay}>
            <SidebarNavItem to={`/#`} key={'home'}>
              Home
            </SidebarNavItem>
            <SidebarNavItem to={`/docs/getting-started`} key={'documentation'}>
              Documentation
            </SidebarNavItem>
            {sidebarHeaders &&
              sidebarHeaders.map(sh => this.renderSidebarItem(sh))}
            <SidebarNavItem to={constants.githubIssues} key={'issues'}>
              Issues
            </SidebarNavItem>
            <SidebarNavItem to={constants.github} key={'github'}>
              Github
            </SidebarNavItem>
          </ContentWrapper>
        </SidebarWrapper>
      </SidebarContainer>
    );
  }
}

Sidebar.propTypes = {
  closeSidebar: PropTypes.func,
  history: PropTypes.object,
  overlay: PropTypes.bool,
  sidebarHeaders: PropTypes.array,
  tocArray: PropTypes.array
};

export default withRouter(withRouteData(Sidebar));
