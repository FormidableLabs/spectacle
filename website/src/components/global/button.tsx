import React from 'react';
import clsx from 'clsx';
import styles from './button.module.scss';

type ButtonProps = {
  as: 'href' | 'link';
  to: string;
  theme: string;
  noMargin?: boolean;
  children: React.ReactNode;
};

const Button = ({ as, to, theme, noMargin, children }: ButtonProps) => {
  const isLight = theme === 'Light' || theme === 'Color';
  const classNames = clsx(
    styles.button,
    noMargin && styles.noMargin,
    isLight && styles.light
  );

  if (as === 'href') {
    return (
      <a
        href={to}
        target="_blank"
        rel="noopener noreferrer"
        className={classNames}
      >
        {children}
      </a>
    );
  }

  if (as === 'link') {
    return (
      <a href={to} className={classNames}>
        {children}
      </a>
    );
  }

  return null;
};

export default Button;
