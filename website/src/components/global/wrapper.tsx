import React from 'react';
import styles from './wrapper.module.scss';

type Wrapper = {
  noMargin?: boolean;
  noPadding?: boolean;
  background: string;
  children: React.ReactNode;
};

const Wrapper = ({ noMargin, noPadding, background, children }: Wrapper) => {
  return (
    <div
      className={`${styles.wrapper} ${noMargin && styles.noMargin} ${
        noPadding && styles.noPadding
      } ${background === 'Light' && styles.light} ${
        background === 'Dark' && styles.dark
      } ${background === 'Color' && styles.color}`}
    >
      {children}
    </div>
  );
};

export default Wrapper;
