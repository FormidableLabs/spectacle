import React from 'react';

export const useTimer = (
  handler: (timeDelay: number) => void,
  period: number,
  isActive: boolean
) => {
  const [timeDelay, setTimeDelay] = React.useState(1);
  const initialTime = React.useRef<number>();
  const callBack = React.useRef<typeof handler>();
  React.useEffect(() => {
    callBack.current = handler;
  }, [handler]);

  // eslint-disable-next-line consistent-return
  React.useEffect(() => {
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
