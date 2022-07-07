import { useState, useRef, useEffect } from 'react';

export const useTimer = (
  handler: (timeDelay: number) => void,
  period: number,
  isActive: boolean
) => {
  const [timeDelay, setTimeDelay] = useState(1);
  const initialTime = useRef<number>();
  const callBack = useRef<typeof handler>();
  useEffect(() => {
    callBack.current = handler;
  }, [handler]);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (isActive) {
      initialTime.current = new Date().getTime();
      const timer = setInterval(() => {
        const currentTime = new Date().getTime();
        const delay = currentTime - initialTime.current!;
        initialTime.current = currentTime;
        setTimeDelay(delay / 1000);
        callBack.current!(timeDelay);
      }, period);

      return () => {
        clearInterval(timer);
      };
    }
  }, [period, isActive, timeDelay]);
};
