import React from 'react';
import PropTypes from 'prop-types';
import { useSelector,useDispatch } from 'react-redux';
import { setShowProjectOverlay,setProject } from '../Redux/action';

export const ProjectOverlay = () => {

  const showProjectOverlay=useSelector(state=>state.addTaskReducer.showProjectOverlay);
  const dispatch=useDispatch();
  const projects=useSelector(state=>state.projectsReducer.projects);

  return (
    projects &&
    showProjectOverlay && (
      <div className="project-overlay" data-testid="project-overlay">
        <ul className="project-overlay__list">
          {projects.map((project) => (
            <li key={project.projectId}>
              <div
                data-testid="project-overlay-action"
                onClick={() => {
                  dispatch(setProject(project.projectId));
                  dispatch(setShowProjectOverlay(false));
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    dispatch(setProject(project.projectId));
                    dispatch(setShowProjectOverlay(false));
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label="Select the task project"
              >
                {project.name}
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  );
};

ProjectOverlay.propTypes = {
  projects: PropTypes.array,
};
