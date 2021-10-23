import React, { useState } from "react";
import { useSelector } from "react-redux";
import Modal from "../../../Modal/Modal";
import CycleForm from "./CycleForm";
import Cycle from "./Cycle";
import './CyclesPage.css';
import '../../../../stylesheets/buttons.css';
import { NavLink, useRouteMatch } from "react-router-dom";

const CyclesPage = () => {
  const { url } = useRouteMatch();
  const { cycles } = useSelector(state => state);
  const [showEdit, setShowEdit] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const toggleEdit = e => {
    e.preventDefault();
    setShowEdit(prev => !prev);
  }

  const handleCreate = e => {
    e.preventDefault();
    setShowModal(true);
  }

  return (
    <div className='cycles-page-container'>
      <div className='cycles-page-button-container'>
        <button className='cycles-page-edit edit-btn btn' onClick={toggleEdit}>
          Edit mode
        </button>
        <button className='cycles-page-create primary-btn btn' onClick={handleCreate}>
          Create new cycle
        </button>
      </div>
      <div className='cycle-conatiner'>
        {
          cycles?.map(cycle => {
            return (
              <NavLink to={`${url}/${cycle.id}/routines`} className='cycle' key={cycle.id}>
                <Cycle cycle={cycle} showEdit={showEdit} />
              </NavLink>
            )
          })
        }
      </div>
      <Modal title='Create a cycle' onClose={() => setShowModal(false)} show={showModal}>
        <CycleForm setShowModal={setShowModal} method='POST'/>
      </Modal>
    </div>
  )
}

export default CyclesPage;
