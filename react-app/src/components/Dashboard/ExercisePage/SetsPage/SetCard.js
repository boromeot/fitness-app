import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Modal from "../../../Modal/Modal";
import SetForm from "./SetForm";

const SetCard = ({ set, showEditButtons, cycleId, routineId, workId, exerciseId }) => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const handleDelete = (e, cycleId, routineId, workId, exerciseId) => {
    e.preventDefault();
    dispatch(/*TODO: Make set delete dispatch */);
  }

  const toggleEditModal = e => {
    e.stopPropagation();
    e.preventDefault();
    setShowModal(true);
  }

  return (
    <>
      <div className='card-name'>
        {`${set.total_reps} reps at ${set.weight}${set.unit}`}
      </div>
      {showEditButtons &&
        <>
          <div className='card-button-container'>
            <button className='edit-btn btn' onClick={toggleEditModal}>Edit</button>
            <button className='delete-btn btn' onClick={e => handleDelete(e, cycleId, routineId, workId, exerciseId)}>Delete</button>
          </div>
          <Modal title='Edit Exercise' onClose={() => setShowModal(false)} show={showModal} >
            <SetForm />
          </Modal>
        </>
      }
    </>
  )
}

export default SetCard;
