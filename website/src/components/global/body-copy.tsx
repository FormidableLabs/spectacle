import React from 'react';
import clsx from 'clsx';
import styles from './body-copy.module.scss';

type BodyCopy = {
  className?: string;
  light?: boolean;
  children: React.ReactNode;
};

const BodyCopy = ({ className, light, children }: BodyCopy) => {
  const classNames = clsx(
    styles.bodyCopy,
    light && styles.light,
    className && className
  );

  return <p className={classNames}>{children}</p>;
};

export default BodyCopy;
