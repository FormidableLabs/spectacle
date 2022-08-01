import React from 'react';
import styles from './bounce-animation.module.scss';

function BounceAnimation({ bouncing, children }) {
  return (
    <span
      className={`${styles.bounceAnimation} ${bouncing && styles.bouncing}`}
    >
      {children}
    </span>
  );
}

export default BounceAnimation;
