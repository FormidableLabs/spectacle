import { useState, useCallback } from 'react';
import { Text } from '../typography';
import { FlexBox, Box } from '../layout-primitives';
import InternalButton from '../internal-button';
import { useTimer } from '../../utils/use-timer';
import { SYSTEM_FONT } from '../../utils/constants';
import { useRegisterActions } from 'kbar';

export const Timer = () => {
  const [timer, setTimer] = useState(0);
  const [timerStarted, setTimerStarted] = useState(false);
  const addToTimer = useCallback((v: number) => setTimer((s) => s + v), []);
  const toggleTimer = useCallback(() => setTimerStarted((s) => !s), []);
  useTimer(addToTimer, 1000, timerStarted);
  const minutes = Math.floor(Math.round(timer) / 60);

  // TODO: this should only be called if 'KBarProvider' is available
  useRegisterActions([
    {
      id: 'Start/Pause Timer',
      name: 'Start/Pause Timer',
      shortcut: ['t', '1'],
      keywords: 'start pause',
      perform: toggleTimer,
      section: 'Timer'
    },
    {
      id: 'Restart Timer',
      name: 'Restart Timer',
      shortcut: ['t', '2'],
      keywords: 'restart',
      perform: () => setTimer(0),
      section: 'Timer'
    }
  ]);

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
