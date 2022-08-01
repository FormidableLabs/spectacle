import React from 'react';
import styles from './section-title.module.scss';

type SectionTitle = {
  light?: boolean;
  children: React.ReactNode;
};

const sectionTitle = ({ light, children }: SectionTitle) => {
  return (
    <h2 className={`${styles.sectionTitle} ${light && styles.light}`}>
      {children}
    </h2>
  );
};

export default sectionTitle;
