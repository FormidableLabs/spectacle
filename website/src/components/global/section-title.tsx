import React from 'react';
import clsx from 'clsx';
import styles from './section-title.module.scss';

type SectionTitle = {
  theme: string;
  children: React.ReactNode;
};

const sectionTitle = ({ theme, children }: SectionTitle) => {
  const isLight = theme === 'Light' || theme === 'Color';
  const classNames = clsx(styles.sectionTitle, isLight && styles.light);

  return <h2 className={classNames}>{children}</h2>;
};

export default sectionTitle;
