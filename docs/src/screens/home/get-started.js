import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { BodyCopy } from '../../components/body-copy';
import { Button } from '../../components/button';
import { SectionTitle } from '../../components/section-title';
import { Wrapper } from '../../components/wrapper';
import constants from '../../constants';

const OuterWrapper = styled.div`
  background: ${constants.color};
`;

class GetStarted extends React.Component {
  render() {
    const { getStartedObj } = this.props;

    return (
      <OuterWrapper>
        <Wrapper>
          <SectionTitle>Get Started</SectionTitle>
          <BodyCopy>{getStartedObj.description}</BodyCopy>
          <Button to={getStartedObj.link}>Documentation</Button>
        </Wrapper>
      </OuterWrapper>
    );
  }
}

GetStarted.propTypes = {
  getStartedObj: PropTypes.object
};

export default GetStarted;
