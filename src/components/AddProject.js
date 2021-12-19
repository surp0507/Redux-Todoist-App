import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { firebase } from '../firebase';
import { generatePushId } from '../helpers';
import { useSelector,useDispatch } from 'react-redux';
import {setShow,setProjectName,setProjects} from '../Redux/action'

export const AddProject = () => {
  const showproject=useSelector(state=>state.addProjectReducer.showproject)
  const projectName=useSelector(state=>state.addProjectReducer.projectName)
  const dispatch=useDispatch()

  const projectId = generatePushId();
  const projects=useSelector(state=>state.projectsReducer.projects)

  const addProject = () =>
    projectName &&
    firebase
      .firestore()
      .collection('projects')
      .add({
        projectId,
        name: projectName,
        userId: '8jWwCW2a0InVkZR7X9NC',
      })
      .then(() => {
        dispatch(setProjects([...projects]));
        dispatch(setProjectName(''));
        dispatch(setShow(false));
      });
      
      const handleChange=(e)=>{
      
        dispatch(setProjectName(e.target.value))
      }

  return (
    <div className="add-project" data-testid="add-project">
    { (
        <div className="add-project__input" data-testid="add-project-inner">
          <input
            value={projectName}
            onChange={handleChange}
            className="add-project__name"
            data-testid="project-name"
            type="text"
            placeholder="Name your project"
          />
          <button
            className="add-project__submit"
            type="button"
            onClick={() => addProject()}
            data-testid="add-project-submit"
          >
            Add Project
          </button>
          <span
            aria-label="Cancel adding project"
            data-testid="hide-project-overlay"
            className="add-project__cancel"
            onClick={() => dispatch(setShow(false))}
            onKeyDown={(e) => {
              if (e.key === 'Enter') dispatch(setShow(false));
            }}
            role="button"
            tabIndex={0}
          >
            Cancel
          </span>
        </div>
      )}
      <span className="add-project__plus">+</span>
      <span
        aria-label="Add Project"
        data-testid="add-project-action"
        className="add-project__text"
        onClick={() => dispatch(setShow(!showproject))}
        onKeyDown={(e) => {
          if (e.key === 'Enter') dispatch(setShow(!showproject));
        }}
        role="button"
        tabIndex={0}
      >
        Add Project
      </span>
    </div>
  );
};

AddProject.propTypes = {
  shouldShow: PropTypes.bool,
};
