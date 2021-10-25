import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, NavLink, useRouteMatch } from 'react-router-dom';
import { deleteRoutine } from '../../../../store/routine';
import Card from '../../templates/Card';
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
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const toggleEditMode = e => {
    e.preventDefault();
    setShowEditButtons(prev => !prev);
  }

  const handleCreate = e => {
    e.preventDefault();
    setShowModal(true);
  }

  const toggleEditModal = e => {
    e.stopPropagation();
    e.preventDefault();
    setShowModal(true);
  }

  const handleDelete = (e, cycleId) => {
    e.preventDefault();
    dispatch(deleteRoutine(cycleId));
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
                      <button className='delete-btn btn' onClick={e => handleDelete(e, routine.id)}>Delete</button>
                    </div>
                    <Modal title={`Edit Routine`} onClose={() => setShowModal(false)} show={showModal} >
                      <RoutineForm setShowModal={setShowModal} method='PATCH' cycleId={routine.id} component='name'/>
                    </Modal>
                  </>
                }
              </>
            </NavLink>
          )
        })
      }
    </div>
    <Modal title={`Create a Routine`} onClose={() => setShowModal(false)} show={showModal}>
      <RoutineForm setShowModal={setShowModal} method='POST' component='Routine' cycleId={cycleId}/>
    </Modal>
  </div>
  )
}

export default RoutinePage;
