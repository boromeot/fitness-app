import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CycleForm from "./CycleForm";
import { deleteCycle } from "../../../../store/cycles";
import { NavLink, useRouteMatch } from 'react-router-dom';
import Modal from "../../../Modal/Modal";
import '../../templates/CyclesPage.css';
import '../../../../stylesheets/buttons.css';

const CyclesPage = () => {
  const { cycles } = useSelector(state => state);
  const { url } = useRouteMatch();
  const [showEditButtons, setShowEditButtons] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const dispatch = useDispatch();

  const toggleEditMode = e => {
    e.preventDefault();
    setShowEditButtons(prev => !prev);
  }

  const handleCreate = e => {
    e.preventDefault();
    setShowCreateModal(true);
  }

  const handleDelete = (e, cycleId) => {
    e.preventDefault();
    dispatch(deleteCycle(cycleId));
  }

  const toggleEditModal = e => {
    e.stopPropagation();
    e.preventDefault();
    setShowEditModal(true);
  }

  return (
    <div className='page-template-container'>
    <div className='page-template-button-container'>
      <button className='page-template-edit edit-btn btn' onClick={toggleEditMode}>
        Edit mode
      </button>
      <button className='page-template-create primary-btn btn' onClick={handleCreate}>
        {`Create new Cycle`}
      </button>
    </div>
    <div className='card-conatiner'>
      {
        cycles?.map(cycle => {
          return (
            <NavLink to={`${url}/${cycle.id}/routines`} className='card' key={cycle.id}>
              <>
                <div className='card-name'>
                  {cycle.name}
                </div>
                {showEditButtons &&
                  <>
                    <div className='card-button-container'>
                      <button className='edit-btn btn' onClick={toggleEditModal}>Edit</button>
                      <button className='delete-btn btn' onClick={e => handleDelete(e, cycle.id)}>Delete</button>
                    </div>
                    <Modal title={`Edit Cycle`} onClose={() => setShowEditModal(false)} show={showEditModal} >
                      <CycleForm setShowModal={setShowEditModal} method='PATCH' cycleId={cycle.id} component='Cycle'/>
                    </Modal>
                  </>
                }
              </>
            </NavLink>
          )
        })
      }
    </div>
    <Modal title={`Create a Cycle`} onClose={() => setShowCreateModal(false)} show={showCreateModal}>
      <CycleForm setShowModal={setShowCreateModal} method='POST' component='Cycle'/>
    </Modal>
  </div>
  )
}

export default CyclesPage;
