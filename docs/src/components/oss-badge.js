import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ProjectBadge, FeaturedBadge } from 'formidable-oss-badges';

export const FEATURED_PROJECTS = ['victory', 'urql', 'renature'];

const OSSImage = styled.div`
  width: 240px;
  max-width: 240px;
`;

export const OSSBadge = ({ project }) => {
  const projectName = project.title.toLowerCase();
  const isFeaturedProject = Boolean(
    FEATURED_PROJECTS.find(p => p === projectName)
  );
  return (
    <OSSImage>
      {isFeaturedProject ? (
        <FeaturedBadge isHoverable name={projectName} />
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
    color: PropTypes.string
  })
};
