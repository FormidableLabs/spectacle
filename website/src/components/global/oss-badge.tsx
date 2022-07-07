import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ProjectBadge, FeaturedBadge } from 'formidable-oss-badges';

export const FEATURED_PROJECTS = [
  'victory',
  'urql',
  'renature',
  'spectacle',
  'nuka'
];

type OSSImage = {
  hoverable: boolean;
};

const OSSImage = styled.a<OSSImage>`
  margin-right: auto;
  margin-left: auto;

  width: 20rem;
  max-width: 20rem;
  padding: 0;
  cursor: pointer;

  @media ${({ theme }) => theme.media.sm} {
    width: 30rem;
    max-width: initial;
  }

  @media ${({ theme }) => theme.media.md} {
    width: 36rem;
    margin-right: 0;
    margin-left: auto;
  }

  &:hover {
    background: none;
    cursor: ${(p) => (p.hoverable ? 'pointer' : 'default')};
  }
`;

export const OSSBadge = ({ project, hoverable }) => {
  const projectName = project.title.toLowerCase();
  const isFeaturedProject = Boolean(
    FEATURED_PROJECTS.find((p) => p === projectName)
  );

  return (
    <OSSImage
      href={project.link}
      title={`Visit ${projectName}'s website.`}
      target="_blank"
      rel="noopener noreferrer"
      hoverable={hoverable}
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
    </OSSImage>
  );
};

OSSBadge.propTypes = {
  project: PropTypes.shape({
    title: PropTypes.string.isRequired,
    abbreviation: PropTypes.string,
    color: PropTypes.string,
    link: PropTypes.string
  }),
  hoverable: PropTypes.bool
};

OSSBadge.defaultProps = {
  hoverable: true
};
