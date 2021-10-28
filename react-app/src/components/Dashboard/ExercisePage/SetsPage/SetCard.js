import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import Modal from "../../../Modal/Modal";
import SetForm from "./SetForm";
import { deleteSet } from "../../../../store/set";

const SetCard = ({ set, showEditButtons }) => {
  const { cycleId, routineId, workId, exerciseId } = useParams();
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const handleDelete = e => {
    e.preventDefault();
    dispatch(deleteSet(+cycleId, +routineId, +workId, +exerciseId, set.id));
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
            <button className='delete-btn btn' onClick={handleDelete}>Delete</button>
          </div>
          <Modal title='Edit Set' onClose={() => setShowModal(false)} show={showModal} >
            <SetForm />
          </Modal>
        </>
      }
    </>
  )
}

export default SetCard;
