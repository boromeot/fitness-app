import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { createPortal } from "react-dom";
import Modal from "../../../Modal/Modal";
import ExerciseForm from "./ExerciseForm";
import { NavLink } from "react-router-dom";
import ExerciseCard from "./ExerciseCard";

const ExercisesPage = () => {
  const [loaded, setLoaded] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditButtons, setShowEditButtons] = useState(false);
  //usEffect is needed because the portal was trying to get 'routine-page-create-container' before the dom node existed
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

  const { cycleId, routineId, workId } = useParams();
  const cycles = useSelector(state => state.cycles)
  const currentCycle = cycles.find(cycle => cycle.id === +cycleId);
  const currentRoutine = currentCycle.routines.find(routine => routine.id === +routineId);
  const currentDay = currentRoutine.workouts.find(workout => workout.id === +workId);

  return (
    <>
      <div className='card-container'>
        {
          currentDay?.exercises.map(exercise => {
            return (
              <NavLink to='#' className='card' key={exercise.id}>
                <ExerciseCard
                  exercise={exercise}
                  showEditButtons={showEditButtons}
                  cycleId={+cycleId}
                  routineId={+routineId}
                  workId={+workId}
                  exerciseId={exercise.id}
                />
              </NavLink>
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
              Create new Exercise
            </button>
          </>,
          document.getElementById('routine-page-create-container')
        )
        //Portal is being used because the button and modal needs to know what ExercisePage / day they belong to
        //so we generate the modal and button here and send the react element to the parent page to retain the same layout as the previous pages
      }
      <Modal title='Create an Exercise' onClose={() => setShowCreateModal(false)} show={showCreateModal}>
        <ExerciseForm setShowModal={setShowCreateModal} method='POST' cycleId={cycleId} routineId={routineId} workId={workId}/>
      </Modal>
    </>
  )
}

export default ExercisesPage;
