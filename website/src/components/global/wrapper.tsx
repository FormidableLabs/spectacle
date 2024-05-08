import React from 'react';
import clsx from 'clsx';
import styles from './wrapper.module.scss';

type Wrapper = {
  noMargin?: boolean;
  noPadding?: boolean;
  background: string;
  className?: string;
  children: React.ReactNode;
};

const Wrapper = ({
  noMargin,
  noPadding,
  background,
  className,
  children
}: Wrapper) => {
  const classNames = clsx(
    styles.wrapper,
    noMargin && styles.noMargin,
    noPadding && styles.noPadding,
    background === 'Light' && styles.light,
    background === 'Dark' && styles.dark,
    background === 'Color' && styles.color,
    className
  );

  return <div className={classNames}>{children}</div>;
};

export default Wrapper;
