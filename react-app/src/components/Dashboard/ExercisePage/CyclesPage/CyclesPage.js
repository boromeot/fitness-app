import React, { useState } from "react";
import { useSelector } from "react-redux";
import CycleForm from "./CycleForm";
import { deleteCycle } from "../../../../store/cycles";
import { NavLink, useRouteMatch } from 'react-router-dom';
import Card from "../../templates/Card";
import Modal from "../../../Modal/Modal";

const CyclesPage = () => {
  const { cycles } = useSelector(state => state);
  const { url } = useRouteMatch();
  const [showEditButtons, setShowEditButtons] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const toggleEditMode = e => {
    e.preventDefault();
    setShowEditButtons(prev => !prev);
  }

  const handleCreate = e => {
    e.preventDefault();
    setShowModal(true);
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
              <Card name={'cycle'} item={cycle} showEditButtons={showEditButtons} Form={CycleForm} deleteDispatcher={deleteCycle}/>
            </NavLink>
          )
        })
      }
    </div>
    <Modal title={`Create a Cycle`} onClose={() => setShowModal(false)} show={showModal}>
      <CycleForm setShowModal={setShowModal} method='POST' component='Cycle'/>
    </Modal>
  </div>
  )
}

export default CyclesPage;
