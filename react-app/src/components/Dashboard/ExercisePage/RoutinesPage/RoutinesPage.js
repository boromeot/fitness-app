import React, { useState } from 'react';
import { useParams, NavLink, useRouteMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Modal from '../../../Modal/Modal';
import RoutineCard from './RoutineCard';
import RoutineForm from './RoutineForm';
import '../../stylesheets/SubPage.css';
import '../../../../stylesheets/buttons.css';
import '../../stylesheets/Form.css';


const RoutinesPage = () => {
  const { userId, cycleId } = useParams();
  const { cycles } = useSelector(state => state);
  const { url } = useRouteMatch();
  const [showEditButtons, setShowEditButtons] = useState(false);
  const currentCycle = cycles.find(cycle => cycle.id === +cycleId);
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
      <div className='page-template-edit-delete-container'>
        <button className='page-template-edit edit-btn btn' onClick={toggleEditMode}>
          Edit mode
        </button>
        <button className='page-template-create primary-btn btn' onClick={handleCreate}>
          {`Create new Routine`}
        </button>
      </div>
      <div className='page-header'>{currentCycle.name} routines</div>
      <NavLink to={`/users/${userId}/dashboard/exercise/cycles`} className='back-btn btn'>
        Back
      </NavLink>
    </div>
    <div className='card-container'>
      {
        currentCycle.routines?.map(routine => {
          return (
            <NavLink to={`${url}/${routine.id}/workouts/${routine.workouts[1]?.id}`} className='card' key={routine.id}>
              <RoutineCard
                routine={routine}
                showEditButtons={showEditButtons}
                cycleId={+cycleId}
                routineId={routine.id}
              />
            </NavLink>
          )
        })
      }
    </div>
    <Modal title={`Create a Routine`} onClose={() => setShowCreateModal(false)} show={showCreateModal}>
      <RoutineForm setShowModal={setShowCreateModal} method='POST' cycleId={cycleId}/>
    </Modal>
  </div>
  )
}

export default RoutinesPage;
