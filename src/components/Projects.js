import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { setSelectedProject } from '../Redux/action';
import { IndividualProject } from './IndividualProject';
import { useSelector } from 'react-redux';
import { setProjectActive } from '../Redux/action';

export const Projects = () => {
  const active=useSelector(state=>state.projectsReducer.active)
  const projects = useSelector(state=>state.projectsReducer.projects);

  return (
    projects &&
    projects.map((project) => (
      <li
        key={project.projectId}
        data-testid="project-action-parent"
        data-doc-id={project.docId}
        className={
          active === project.projectId
            ? 'active sidebar__project'
            : 'sidebar__project'
        }
      >
        <div
          role="button"
          data-testid="project-action"
          tabIndex={0}
          aria-label={`Select ${project.name} as the task project`}
          onClick={() => {
            dispatch(setProjectActive(project.projectId));
            dispatch(setSelectedProject(project.projectId));
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              dispatch(setProjectActive(project.projectId));
              dispatch(setSelectedProject(project.projectId));
            }
          }}
        >
        <IndividualProject project={project} />
        </div>
      </li>
    ))
  );
};

Projects.propTypes = {
  activeValue: PropTypes.bool,
};
