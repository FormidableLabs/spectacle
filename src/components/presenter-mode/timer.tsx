import { useState, useCallback } from 'react';
import { Text } from '../typography';
import { FlexBox, Box } from '../layout-primitives';
import InternalButton from '../internal-button';
import { useTimer } from '../../utils/use-timer';
import { SYSTEM_FONT } from '../../utils/constants';

export const Timer = () => {
  const [timer, setTimer] = useState(0);
  const [timerStarted, setTimerStarted] = useState(false);
  const addToTimer = useCallback((v: number) => setTimer((s) => s + v), []);
  useTimer(addToTimer, 1000, timerStarted);
  const minutes = Math.floor(Math.round(timer) / 60);
  return (
    <FlexBox>
      <FlexBox justifyContent="flex-start" flex={1}>
        <Text
          fontFamily={SYSTEM_FONT}
          fontWeight="bold"
          fontSize="2vw"
          textAlign="left"
        >{`${String(minutes).padStart(2, '0')}:${String(
          Math.round(timer) - minutes * 60
        ).padStart(2, '0')}`}</Text>
      </FlexBox>
      <InternalButton onClick={() => setTimerStarted((s) => !s)}>
        {timerStarted ? 'Stop Timer' : 'Start Timer'}
      </InternalButton>
      <Box width={8} />
      <InternalButton onClick={() => setTimer(0)}>Reset</InternalButton>
    </FlexBox>
  );
};
