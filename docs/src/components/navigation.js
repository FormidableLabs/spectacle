import styled from 'styled-components';
import { Link } from 'react-static';
import sidebarBackground from '../static/svgs/sidebar-background.svg';
import collapsedSidebarBackground from '../static/svgs/collapsed-sidebar-background.svg';

const sidebarZIndex = 900;

export const Navigation = styled.div`
  align-items: center;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: row;
  height: 6rem;
  width: 100%;

  & img {
    margin-left: auto;
    @media (min-width: 768px) {
      margin-left: 0;
    }
  }
`;
export const SidebarContainer = styled.div`
  width: 24rem;
  min-width: 24rem;
  min-height: 100vh;

  @media (max-width: 768px) {
    min-width: 2.5rem;
    width: 2.5rem;
  }
`;

export const SidebarWrapper = styled.aside`
  font-family: 'akkurat';
  background-image: url(${sidebarBackground});
  background-repeat: repeat-y;
  background-size: 100%;
  min-height: 100vh;
  padding-top: 18rem;
  min-width: 24rem;
  width: 24rem;
  z-index: ${sidebarZIndex};
  position: fixed;
  overflow-y: scroll;
  top: 0;
  bottom: 0;

  @media (max-width: 768px) {
    background-image: ${props =>
      props.overlay
        ? `url(${sidebarBackground})`
        : `url(${collapsedSidebarBackground})`};
    min-width: ${props => (props.overlay ? '24rem' : '2.5rem')};
    width: ${props => (props.overlay ? '24rem' : '2.5rem')};
  }
`;

export const SidebarNavItem = styled(Link)`
  color: white;
  font-size: 1.6rem;
  display: inline-block;
  margin: 0.25rem 0;
  padding: 0.25rem;
  padding-left: 1.25rem;
  &:hover {
    color: rgba(200, 200, 200, 0.8);
  }

  /* For selected state (need to break out of container) */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 3rem;
    background: ${({ isSelected }) =>
      isSelected ? 'rgba(0, 0, 0, 0.2)' : 'transparent'};
  }
`;

export const SidebarNavSubItem = styled(Link)`
  color:  ${({ isSelected }) =>
    isSelected ? 'rgba(255, 255, 255, 0.8)' : 'white'};
  }
  margin-left: 3rem;
  margin-top: 1rem;
  font-size: 1.4rem;
  &:hover {
    color: rgba(200, 200, 200, 0.8);
  }

  /* For selected state (need to break out of container) */
  &::after {
    content: "";
    position: absolute;
    left: 0;
    width: 100%;
    height: 2rem;
    background: ${({ isSelected }) =>
      isSelected ? 'rgba(0, 0, 0, 0.2)' : 'transparent'};
  }
`;
