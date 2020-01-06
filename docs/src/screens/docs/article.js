import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withRouteData } from 'react-static';
import { Markdown } from '../../components/markdown';

const Container = styled.div`
  box-sizing: content-box;
  max-width: 70rem;
  min-height: 100vh;
  width: 100%;
  padding: 10rem 4rem 8rem;
  @media (max-width: 768px) {
    padding: 6rem 4rem 8rem 3.5rem;
  }
  .gatsby-highlight {
    @media (max-width: 768px) {
      margin-left: -2rem;
    }
    code {
      overflow-x: scroll;
    }
  }
`;

class Article extends React.Component {
  render() {
    return (
      <Container>
        <Markdown dangerouslySetInnerHTML={{ __html: this.props.renderedMd }} />
      </Container>
    );
  }
}

Article.propTypes = {
  renderedMd: PropTypes.string
};

Article.defaultProps = {
  params: null
};

export default withRouteData(Article);
