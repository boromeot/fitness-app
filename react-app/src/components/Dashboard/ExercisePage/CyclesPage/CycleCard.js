import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Modal from "../../../Modal/Modal";
import CycleForm from "./CycleForm";
import { deleteCycle } from "../../../../store/cycles";

const CycleCard = ({ cycle, showEditButtons }) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const handleDelete = (e, cycleId) => {
    e.preventDefault();
    dispatch(deleteCycle(cycleId));
  }

  const toggleEditModal = e => {
    e.stopPropagation();
    e.preventDefault();
    setShowModal(true);
  }

  return (
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
          <Modal title='Edit Cycle' onClose={() => setShowModal(false)} show={showModal} >
            <CycleForm
              setShowModal={setShowModal}
              method='PATCH'
              cycle={cycle}
            />
          </Modal>
        </>
      }
    </>
  )
}

export default CycleCard;
