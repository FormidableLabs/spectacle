import React from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
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
      <Link to={to} className={classNames}>
        {children}
      </Link>
    );
  }

  return null;
};

export default Button;
