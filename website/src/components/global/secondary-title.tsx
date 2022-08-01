import React from 'react';
import clsx from 'clsx';
import styles from './secondary-title.module.scss';

type SecondaryTitle = {
  className?: string;
  light?: boolean;
  children: React.ReactNode;
};

const SecondaryTitle = ({ className, light, children }: SecondaryTitle) => {
  const classNames = clsx(
    styles.secondaryTitle,
    light && styles.light,
    className && className
  );

  return <h3 className={classNames}>{children}</h3>;
};

export default SecondaryTitle;
