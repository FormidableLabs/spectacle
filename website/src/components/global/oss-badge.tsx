import React from 'react';
import { ProjectBadge, FeaturedBadge } from 'formidable-oss-badges';
import styles from './oss-badge.module.scss';

export const FEATURED_PROJECTS = [
  'victory',
  'urql',
  'renature',
  'spectacle',
  'nuka'
];

interface OSSBadge {
  project: {
    title: string;
    abbreviation?: string;
    color?: string;
    link?: string;
  };
  hoverable: boolean;
}

const OSSBadge = ({ project, hoverable }: OSSBadge) => {
  const projectName = project.title.toLowerCase();
  const isFeaturedProject = Boolean(
    FEATURED_PROJECTS.find((p) => p === projectName)
  );

  const wrapperClassName = `${styles.ossImage} ${
    hoverable && styles.hoverable
  }`;
  const children = isFeaturedProject ? (
    <FeaturedBadge isHoverable={hoverable} name={projectName} />
  ) : (
    <ProjectBadge
      abbreviation={project.abbreviation}
      color={project.color}
      description={project.title}
    />
  );

  return project.link ? (
    <a
      className={wrapperClassName}
      href={project.link}
      title={`Visit ${projectName}'s website.`}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  ) : (
    <span className={wrapperClassName}>{children}</span>
  );
};

export { OSSBadge };
