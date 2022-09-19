import React from 'react';
import clsx from 'clsx';
import styles from './bounce-animation.module.scss';

function BounceAnimation({ bouncing, children }) {
  const classNames = clsx(styles.bounceAnimation, bouncing && styles.bouncing);
  return <span className={classNames}>{children}</span>;
}

export default BounceAnimation;
