import React, { useState } from 'react';
import { FaRegListAlt, FaRegCalendarAlt } from 'react-icons/fa';
import { setShowQuickAddTask,setTask } from '../Redux/action';
import {setShowMain,setProject,setShowProjectOverlay,setShowTaskDate} from '../Redux/action'
import { useDispatch,useSelector } from 'react-redux';
import moment from 'moment';
import PropTypes from 'prop-types';
import { firebase } from '../firebase';
import { ProjectOverlay } from './ProjectOverlay';
import { TaskDate } from './TaskDate';

export const AddTask = () => {
 const showQuickAddTask=useSelector(state=>state.headerReducer.showQuickAddTask)
 const task=useSelector(state=>state.addTaskReducer.task)
 const taskDate=useSelector(state=>state.addTaskReducer.taskDate)
 const project=useSelector(state=>state.addTaskReducer.project)
 const showMain=useSelector(state=>state.addTaskReducer.showMain)
 const showProjectOverlay=useSelector(state=>state.addTaskReducer.showProjectOverlay)
 const showTaskDate=useSelector(state=>state.addTaskReducer.showTaskDate)
 const showAddTaskMain=useSelector(state=>state.addTaskReducer.showAddTaskMain)
 const selectedProject=useSelector(state=>state.projectsReducer.selectedProject);
 const dispatch=useDispatch()

  const addTask = () => {
    dispatch(setShowQuickAddTask(false))
    const projectId = project || selectedProject;
    let collatedDate = '';
    if (projectId === 'TODAY') {
      collatedDate = moment().format('DD/MM/YYYY');
    } else if (projectId === 'NEXT_7') {
      collatedDate = moment().add(7, 'days').format('DD/MM/YYYY');
    }

    return (
      task &&
      projectId &&
      firebase
        .firestore()
        .collection('tasks')
        .add({
          archived: false,
          projectId,
          task,
          date: collatedDate || taskDate,
          userId: 'OnkrJQ69kDr4y61y9jBm',
        })
        .then(() => {
          dispatch(setTask(''));
          dispatch(setProject(''));
          dispatch(setShowMain(''));
          dispatch(setShowProjectOverlay(false));
        })
    );
  };

  return (
    <div
      className={showQuickAddTask ? 'add-task add-task__overlay' : 'add-task'}
      data-testid="add-task-comp"
    >
      {showAddTaskMain && (
        <div
          className="add-task__shallow"
          data-testid="show-main-action"
          onClick={() => dispatch(setShowMain(!showMain))}
          onKeyDown={(e) => {
            if (e.key === 'Enter') dispatch(setShowMain(!showMain));
          }}
          tabIndex={0}
          aria-label="Add task"
          role="button"
        >
          <span className="add-task__plus">+</span>
          <span className="add-task__text">Add Task</span>
        </div>
      )}

      {(showMain || showQuickAddTask) && (
        <div className="add-task__main" data-testid="add-task-main">
          {showQuickAddTask && (
            <>
              <div data-testid="quick-add-task">
                <h2 className="header">Quick Add Task</h2>
                <span
                  className="add-task__cancel-x"
                  data-testid="add-task-quick-cancel"
                  aria-label="Cancel adding task"
                  onClick={() => {
                    dispatch(setShowMain(false));
                    dispatch(setShowProjectOverlay(false));
                    dispatch(setShowQuickAddTask(false));
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      dispatch(setShowMain(false));
                      dispatch(setShowProjectOverlay(false));
                      dispatch(setShowQuickAddTask(false));
                    }
                  }}
                  tabIndex={0}
                  role="button"
                >
                 x
                </span>
              </div>
            </>
          )}
          <ProjectOverlay
          />
          <TaskDate
           
          />
          <input
            className="add-task__content"
            aria-label="Enter your task"
            data-testid="add-task-content"
            type="text"
            value={task}
            onChange={(e) => dispatch(setTask(e.target.value))}
          />
          <button
            type="button"
            className="add-task__submit"
            data-testid="add-task"
            onClick={() =>
              showQuickAddTask
                ? addTask() && dispatch(setShowQuickAddTask(false))
                : addTask()
            }
          >
            Addoriginal Task
          </button>
          {!showQuickAddTask && (
            <span
              className="add-task__cancel"
              data-testid="add-task-main-cancel"
              onClick={() => {
                dispatch(setShowMain(false));
                dispatch(setShowProjectOverlay(false));
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  dispatch(setShowMain(false));
                  dispatch(setShowProjectOverlay(false));
                }
              }}
              aria-label="Cancel adding a task"
              tabIndex={0}
              role="button"
            >
              Cancel
            </span>
          )}
          <span
            className="add-task__project"
            data-testid="show-project-overlay"
            onClick={() => dispatch(setShowProjectOverlay(!showProjectOverlay))}
            onKeyDown={(e) => {
              if (e.key === 'Enter') dispatch(setShowProjectOverlay(!showProjectOverlay));
            }}
            tabIndex={0}
            role="button"
          >
            <FaRegListAlt />
          </span>
          <span
            className="add-task__date"
            data-testid="show-task-date-overlay"
            onClick={() => dispatch(setShowTaskDate(!showTaskDate))}
            onKeyDown={(e) => {
              if (e.key === 'Enter') dispatch(setShowTaskDate(!showTaskDate));
            }}
            tabIndex={0}
            role="button"
          >
            <FaRegCalendarAlt />
          </span>
        </div>
      )}
    </div>
  );
};

AddTask.propTypes = {
  showAddTaskMain: PropTypes.bool,
  shouldShowMain: PropTypes.bool,
  showQuickAddTask: PropTypes.bool,
  setShowQuickAddTask: PropTypes.func,
};
