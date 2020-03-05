import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { withRouteData, Link } from 'react-static';
import Article from './article';
import Sidebar from './sidebar';
import burger from '../../static/svgs/burger.svg';
import logoFormidableDark from '../../static/svgs/logo_formidable_dark.svg';
import constants from '../../constants';
import { Footer } from '../../components/footer';

const headerZIndex = 800;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  height: 6rem;
  width: 100%;
  position: fixed;
  left: 24rem;
  background: white;
  z-index: ${headerZIndex};
  padding-right: 3rem;
  box-shadow: 0 5px 10px -5px lightgrey;

  @media (max-width: 768px) {
    box-shadow: 0 5px 10px -5px lightgrey;
    margin-left: 2.5rem;
    right: 0;
    width: calc(100% - 2rem);
    justify-content: flex-start;
    left: 0;
  }
`;

const HeaderLogo = styled.img`
  position: relative;
  right: 25rem;

  @media (max-width: 768px) {
    right: 7rem;
    padding-left: 2rem;
  }
  @media (max-width: 600px) {
    display: none;
  }
`;

const CollapsedMenu = styled.div`
  cursor: pointer;
  padding-left: 2.5rem;
  display: none;

  @media (max-width: 768px) {
    display: block;
    visibility: ${props => (props.overlay ? 'hidden' : 'visible')};
    padding-left: 2.5rem;
    position: absolute;
    left: 0;
  }
  @media (max-width: 600px) {
    padding-left: 2.5rem;
    position: absolute;
    left: 0;
  }
`;

const DocsTitle = styled.h2`
  font-size: 2.8rem;
  flex: auto;
  width: 100%;
  margin: 0;
  position: relative;
  left: 4rem;

  @media (max-width: 768px) {
    font-size: 3rem;
    left: 6.5rem;
    margin: 0;
  }
  @media (max-width: 600px) {
    left: 6.5rem;
  }
`;

const MainContent = styled.div`
  width: 100%;
`;

class Docs extends React.Component {
  constructor(props) {
    super(props);
    this.closeSidebar = this.closeSidebar.bind(this);
    this.state = { openSidebar: false };
  }

  openSidebar() {
    this.setState({ openSidebar: true });
  }

  closeSidebar() {
    this.setState({ openSidebar: false });
  }

  render() {
    return (
      <Container>
        <Wrapper noPadding>
          <CollapsedMenu overlay={this.state.openSidebar}>
            <img src={burger} alt="Menu" onClick={() => this.openSidebar()} />
          </CollapsedMenu>
          <DocsTitle>
            <Link to={'/'} style={{ color: '#3b3b3b' }}>
              {constants.docsTitle}
            </Link>
          </DocsTitle>
          <Link to={'https://formidable.com'}>
            <HeaderLogo src={logoFormidableDark} alt="Formidable Logo" />
          </Link>
        </Wrapper>
        <Sidebar
          overlay={this.state.openSidebar}
          closeSidebar={this.closeSidebar}
        />
        <MainContent>
          <Article />
          <Footer articleFooter />
        </MainContent>
      </Container>
    );
  }
}

Docs.propTypes = {
  params: PropTypes.object
};

Docs.defaultProps = {
  params: null
};

export default withRouteData(Docs);
