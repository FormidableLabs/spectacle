import React from 'react';
import clsx from 'clsx';
import styles from './body-copy.module.scss';

type BodyCopy = {
  className?: string;
  theme: string;
  children: React.ReactNode;
};

const BodyCopy = ({ className, theme, children }: BodyCopy) => {
  const isLight = theme === 'Light' || theme === 'Color';
  const classNames = clsx(
    styles.bodyCopy,
    isLight && styles.light,
    className && className
  );

  return <p className={classNames}>{children}</p>;
};

export default BodyCopy;
