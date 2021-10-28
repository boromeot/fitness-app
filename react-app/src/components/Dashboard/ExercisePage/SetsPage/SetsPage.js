import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { createPortal } from 'react-dom';
import Modal from '../../../Modal/Modal';
import SetCard from './SetCard';
import '../../stylesheets/SubPage.css';
import '../../../../stylesheets/buttons.css';
import '../../stylesheets/Form.css';
import SetForm from './SetForm';


const SetsPage = () => {
  const { cycleId, routineId, workId, exerciseId } = useParams();
  const cycles = useSelector(state => state.cycles)
  const currentCycle = cycles.find(cycle => cycle.id === +cycleId);
  const currentRoutine = currentCycle.routines.find(routine => routine.id === +routineId);
  const currentWorkout = currentRoutine.workouts.find(workout => workout.id === +workId);
  const currentExercise = currentWorkout.exercises.find(exercise => exercise.id === +exerciseId);

  const [loaded, setLoaded] = useState(false);
  const [showEditButtons, setShowEditButtons] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, [])

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
      <div className='card-container'>
        {
          currentExercise.sets?.map(set => {
            return (
              <div className='card' key={set.id}>
                <SetCard
                  set={set}
                  showEditButtons={showEditButtons}
                  cycleId={+cycleId}
                  routineId={+routineId}
                  workId={+workId}
                  exerciseId={+exerciseId}
                  setId={set.id}
                />
              </div>
            )
          })
        }
      </div>
     {loaded &&
        createPortal(
          <>
            <button className='page-template-edit edit-btn btn' onClick={toggleEditMode}>
              Edit mode
            </button>
            <button className='page-template-create primary-btn btn' onClick={handleCreate}>
              {`Add a Set`}
            </button>
          </>,
          document.getElementById('routine-page-create-container')
        )
        //Portal is being used because the button and modal needs to know what ExercisePage / day they belong to
        //so we generate the modal and button here and send the react element to the parent page to retain the same layout as the previous pages
      }
    <Modal title={`Add a Set`} onClose={() => setShowCreateModal(false)} show={showCreateModal}>
      <SetForm setShowModal={setShowCreateModal} method='POST' />
    </Modal>
  </div>
  )
}

export default SetsPage;
