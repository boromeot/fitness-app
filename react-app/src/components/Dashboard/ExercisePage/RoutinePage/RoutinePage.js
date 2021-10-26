import React, { useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import Modal from "../../../Modal/Modal";
import RoutineForm from "../RoutinesPage/RoutineForm";
import './RoutinePage.css';

const RoutinePage = () => {
  const { userId, cycleId, routineId } = useParams();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

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
      <div className='routine-page-days-container'>
        {
          days.map((day, i) => {
            return <div className='routine-page-day' key={i}>{day}</div>
          })
        }
      </div>
      <Modal title={`Create a Routine`} onClose={() => setShowCreateModal(false)} show={showCreateModal}>
        <RoutineForm setShowModal={setShowCreateModal} method='POST' cycleId={cycleId}/>
      </Modal>
    </div>
  )
}

export default RoutinePage;
