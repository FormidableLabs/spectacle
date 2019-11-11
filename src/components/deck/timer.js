import React from 'react';
import { useTimer } from '../../utils/use-timer';
import { Text, FlexBox, Box } from '../../';
import InternalButton from '../internal-button';

export const Timer = () => {
  const [timer, setTimer] = React.useState(0);
  const [timerStarted, setTimerStarted] = React.useState(false);
  const addToTimer = React.useCallback(v => setTimer(s => s + v), []);
  useTimer(addToTimer, 1000, timerStarted);
  const minutes = Math.floor(timer.toFixed(0) / 60);
  return (
    <FlexBox>
      <FlexBox justifyContent="flex-start" flex={1}>
        <Text fontWeight="bold" fontSize={24}>{`${String(minutes).padStart(
          2,
          '0'
        )}:${String(timer.toFixed(0) - minutes * 60).padStart(2, '0')}`}</Text>
      </FlexBox>
      <InternalButton onClick={() => setTimerStarted(s => !s)}>
        {timerStarted ? 'Stop Timer' : 'Start Timer'}
      </InternalButton>
      <Box width={8} />
      <InternalButton onClick={() => setTimer(0)}>Reset</InternalButton>
    </FlexBox>
  );
};
