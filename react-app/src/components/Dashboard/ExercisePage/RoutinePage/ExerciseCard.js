import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Modal from "../../../Modal/Modal";
import ExerciseForm from "./ExerciseForm";
import { deleteExercise } from "../../../../store/exercise";

const ExerciseCard = ({ exercise, showEditButtons, cycleId, routineId}) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const handleDelete = (e, cycleId) => {
    e.preventDefault();
    dispatch(deleteExercise(routineId, cycleId));
  }

  const toggleEditModal = e => {
    e.stopPropagation();
    e.preventDefault();
    setShowModal(true);
  }

  return (
    <>
      <div className='card-name'>
        {exercise.name}
      </div>
      {showEditButtons &&
        <>
          <div className='card-button-container'>
            <button className='edit-btn btn' onClick={toggleEditModal}>Edit</button>
            <button className='delete-btn btn' onClick={e => handleDelete(e, cycleId)}>Delete</button>
          </div>
          <Modal title='Edit Exercise' onClose={() => setShowModal(false)} show={showModal} >
            <ExerciseForm setShowModal={setShowModal} method='PATCH' cycleId={cycleId} routineId={routineId}/>
          </Modal>
        </>
      }
    </>
  )
}

export default ExerciseCard;
