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

export const OSSBadge = ({ project, hoverable }: OSSBadge) => {
  const projectName = project.title.toLowerCase();
  const isFeaturedProject = Boolean(
    FEATURED_PROJECTS.find((p) => p === projectName)
  );

  return (
    <a
      className={`${styles.ossImage} ${hoverable && styles.hoverable}`}
      href={project.link}
      title={`Visit ${projectName}'s website.`}
      target="_blank"
      rel="noopener noreferrer"
    >
      {isFeaturedProject ? (
        <FeaturedBadge isHoverable={hoverable} name={projectName} />
      ) : (
        <ProjectBadge
          abbreviation={project.abbreviation}
          color={project.color}
          description={project.title}
        />
      )}
    </a>
  );
};
