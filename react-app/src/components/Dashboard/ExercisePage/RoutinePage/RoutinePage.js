import React, { useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import Modal from "../../../Modal/Modal";
import RoutineForm from "../RoutinesPage/RoutineForm";

const RoutinePage = () => {
  const { userId, cycleId, routineId } = useParams();
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleCreate = e => {
    e.preventDefault();
    setShowCreateModal(true);
  }

  return (
    <div className='page-template-container'>
      <div className='page-template-button-container'>
        <div className='page-template-edit-delete-container'>
          <button className='page-template-create primary-btn btn' onClick={handleCreate}>
            {`Create new Routine`}
          </button>
        </div>
        <NavLink to={`/users/${userId}/dashboard/exercise/cycles/${cycleId}/routines`} className='back-btn btn'>
          Back
        </NavLink>
      </div>
      <Modal title={`Create a Routine`} onClose={() => setShowCreateModal(false)} show={showCreateModal}>
        <RoutineForm setShowModal={setShowCreateModal} method='POST' cycleId={cycleId}/>
      </Modal>
    </div>
  )
}

export default RoutinePage;
