import * as React from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled('div')``;

const ButtonWithStyle = styled('button')`
  position: absolute;
  right: 0;
  transform: translate(-110%, 50%);
  background: transparent;
  outline: none;
  border: none;
  color: #f5f5f5;
  cursor: pointer;
`;

const CopyButton = props => {
  function copy(content) {
    const input = document.createElement('textarea');
    input.innerHTML = content;
    document.body.appendChild(input);
    input.select();
    var result = document.execCommand('copy');
    document.body.removeChild(input);
    return result;
  }
  return (
    <Container>
      <ButtonWithStyle onClick={() => copy(props.content)}>
        {props.name}
      </ButtonWithStyle>
    </Container>
  );
};

CopyButton.propTypes = {
  content: propTypes.any,
  name: propTypes.string
};

CopyButton.defaultProps = {
  content: 'Hi',
  name: 'COPY'
};

export default CopyButton;
