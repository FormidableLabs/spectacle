import React from 'react';
import clsx from 'clsx';
import styles from './secondary-title.module.scss';

type SecondaryTitle = {
  className?: string;
  theme: string;
  children: React.ReactNode;
};

const SecondaryTitle = ({ className, theme, children }: SecondaryTitle) => {
  const isLight = theme === 'Light' || theme === 'Color';
  const classNames = clsx(
    styles.secondaryTitle,
    isLight && styles.light,
    className && className
  );

  return <h3 className={classNames}>{children}</h3>;
};

export default SecondaryTitle;
