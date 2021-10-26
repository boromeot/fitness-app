import React, { useState } from "react";
import { NavLink, useRouteMatch } from 'react-router-dom';
import { useSelector } from "react-redux";
import Modal from "../../../Modal/Modal";
import CycleCard from "./CycleCard";
import CycleForm from "./CycleForm";
import '../../stylesheets/SubPage.css';
import '../../../../stylesheets/buttons.css';
import '../../stylesheets/Form.css';

const CyclesPage = () => {
  const { cycles } = useSelector(state => state);
  const { url } = useRouteMatch();
  const [showEditButtons, setShowEditButtons] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const toggleEditMode = e => {
    e.preventDefault();
    setShowEditButtons(prev => !prev);
  }

  const handleCreate = e => {
    e.preventDefault();
    setShowCreateModal(true);
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
              <CycleCard
                cycle={cycle}
                showEditButtons={showEditButtons}
              />
            </NavLink>
          )
        })
      }
    </div>
    <Modal title={`Create a Cycle`} onClose={() => setShowCreateModal(false)} show={showCreateModal}>
      <CycleForm setShowModal={setShowCreateModal} method='POST' />
    </Modal>
  </div>
  )
}

export default CyclesPage;
