import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, NavLink, useRouteMatch } from 'react-router-dom';
import { deleteRoutine } from '../../../../store/routine';
import Modal from '../../../Modal/Modal';
import RoutineForm from './RoutineForm';
import '../../templates/CyclesPage.css';
import '../../../../stylesheets/buttons.css';


const RoutinePage = () => {
  const { cycleId } = useParams();
  const { cycles } = useSelector(state => state);
  const { url } = useRouteMatch();
  const [showEditButtons, setShowEditButtons] = useState(false);
  const currentCycle = cycles.find(cycle => cycle.id === +cycleId);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const dispatch = useDispatch();

  const toggleEditMode = e => {
    e.preventDefault();
    setShowEditButtons(prev => !prev);
  }

  const handleCreate = e => {
    e.preventDefault();
    setShowCreateModal(true);
  }

  const toggleEditModal = e => {
    e.stopPropagation();
    e.preventDefault();
    setShowEditModal(true);
  }

  const handleDelete = (e, routineId, cycleId) => {
    e.preventDefault();
    dispatch(deleteRoutine(routineId, +cycleId));
  }

  return (
    <div className='page-template-container'>
    <div className='page-template-button-container'>
      <button className='page-template-edit edit-btn btn' onClick={toggleEditMode}>
        Edit mode
      </button>
      <button className='page-template-create primary-btn btn' onClick={handleCreate}>
        {`Create new Routine`}
      </button>
    </div>
    <div className='card-conatiner'>
      {
        currentCycle.routines?.map(routine => {
          return (
            <NavLink to={`${url}/${routine.id}`} className='card' key={routine.id}>
              <>
                <div className='card-name'>
                  {routine.name}
                </div>
                {showEditButtons &&
                  <>
                    <div className='card-button-container'>
                      <button className='edit-btn btn' onClick={toggleEditModal}>Edit</button>
                      <button className='delete-btn btn' onClick={e => handleDelete(e, routine.id, cycleId)}>Delete</button>
                    </div>
                    <Modal title={`Edit Routine`} onClose={() => setShowEditModal(false)} show={showEditModal} >
                      <RoutineForm setShowModal={setShowEditModal} method='PATCH' cycleId={routine.id} component='name' routineId={routine.id}/>
                    </Modal>
                  </>
                }
              </>
            </NavLink>
          )
        })
      }
    </div>
    <Modal title={`Create a Routine`} onClose={() => setShowCreateModal(false)} show={showCreateModal}>
      <RoutineForm setShowModal={setShowCreateModal} method='POST' component='Routine' cycleId={cycleId}/>
    </Modal>
  </div>
  )
}

export default RoutinePage;
