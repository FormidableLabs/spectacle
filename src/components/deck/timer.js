import React from 'react';
import styled, { css } from 'styled-components';

import { useTimer } from '../../utils/use-timer';
import { Text } from '../typography';
import { compose, color, typography } from 'styled-system';

const Button = styled.button(
  compose(
    color,
    typography
  ),
  css`
    width: 4em;
    height: 2em;
    margin-right: 1em;
    border: none;
  `
);

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 16px;
`;

export const Timer = () => {
  const [timer, setTimer] = React.useState(0);
  const [timerStarted, setTimerStarted] = React.useState(false);
  const addToTimer = React.useCallback(v => setTimer(s => s + v));
  useTimer(addToTimer, 1000, timerStarted);
  const minutes = Math.floor(timer.toFixed(0) / 60);
  return (
    <>
      <Text>{`${String(minutes).padStart(2, '0')}:${String(
        timer.toFixed(0) - minutes * 60
      ).padStart(2, '0')}`}</Text>
      <ButtonContainer>
        <Button onClick={() => setTimerStarted(s => !s)}>
          {timerStarted ? 'Stop' : 'Start'}
        </Button>
        <Button
          color="secondary"
          backgroundColor="primary"
          onClick={() => setTimer(0)}
        >
          Reset
        </Button>
      </ButtonContainer>
    </>
  );
};

Button.defaultProps = {
  backgroundColor: 'secondary',
  color: 'primary',
  fontSize: '18px'
};
