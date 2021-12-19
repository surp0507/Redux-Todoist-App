import React, { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import {Modal,Button} from 'react-bootstrap'
import {setShowModal} from '../Redux/action/index'
import { setSelectedProject } from '../Redux/action/index';
import PropTypes from 'prop-types';
import { useSelector,useDispatch } from 'react-redux';
import { firebase } from '../firebase';

export const IndividualProject = ({ project }) => {

const showmodal=useSelector(state=>state.indivisualProjectReducer.showmodal);
const dispatch=useDispatch()
  const handleClose = () => dispatch(setShowModal(false));
  const handleShow = () => dispatch(setShowModal(true));
  const projects=useSelector(state=>state.projectsReducer.projects)


  const deleteProject = (docId) => {
    alert("successfully Deleted");
    firebase
      .firestore()
      .collection('projects')
      .doc(docId)
      .delete()
      .then(() => {
        dispatch(setProjects([...projects]));
        dispatch(setSelectedProject('INBOX'));
      });
  };

  return (
    <>
      <span className="sidebar__dot">•</span>
      <span className="sidebar__project-name">{project.name}</span>
      <span onClick={handleShow}>
        <FaTrashAlt />
      </span>
    

      <Modal
        show={showmodal}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <li>Are you sure you want to delete</li>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            cancel
          </Button>
          <Button variant="primary" onClick={()=>deleteProject(project.docId)}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

IndividualProject.propTypes = {
  project: PropTypes.object.isRequired,
};
