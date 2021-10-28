import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Modal from "../../../Modal/Modal";
import RoutineForm from "./RoutineForm";
import { deleteRoutine } from "../../../../store/routine";

const RoutineCard = ({ routine, showEditButtons, cycleId, routineId}) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const handleDelete = (e, cycleId) => {
    e.preventDefault();
    dispatch(deleteRoutine(routineId, cycleId));
  }

  const toggleEditModal = e => {
    e.stopPropagation();
    e.preventDefault();
    setShowModal(true);
  }

  return (
    <>
      <div className='card-name'>
        {routine.name}
      </div>
      {showEditButtons &&
        <>
          <div className='card-button-container'>
            <button className='edit-btn btn' onClick={toggleEditModal}>Edit</button>
            <button className='delete-btn btn' onClick={e => handleDelete(e, cycleId)}>Delete</button>
          </div>
          <Modal title='Edit Routine' onClose={() => setShowModal(false)} show={showModal} >
            <RoutineForm routine={routine} setShowModal={setShowModal} method='PATCH' cycleId={cycleId} routineId={routineId}/>
          </Modal>
        </>
      }
    </>
  )
}

export default RoutineCard;
