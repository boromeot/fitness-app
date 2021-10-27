import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { createPortal } from "react-dom";
import Modal from "../../../Modal/Modal";
import ExerciseForm from "./ExerciseForm";

const ExercisesPage = () => {
  const [loaded, setLoaded] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, [])

  const handleCreate = e => {
    e.preventDefault();
    setShowCreateModal(true);
  }

  const { cycleId, routineId, day } = useParams();
  const cycles = useSelector(state => state.cycles)
  const currentCycle = cycles.find(cycle => cycle.id === +cycleId);
  const currentRoutine = currentCycle.routines.find(routine => routine.id === +routineId);
  const currentDay = currentRoutine.workouts.find(workout => workout.day === day);
  return (
    <>
      <div className='card-container'>
        {
          currentDay?.exercises.map(exercise => {
            return <div className='card'> {exercise.name} &nbsp; {exercise.id}</div>
          })
        }
      </div>

      {loaded &&
        createPortal(
          <button className='page-template-create primary-btn btn' onClick={handleCreate}>
            Create new Exercise
          </button>,
          document.getElementById('routine-page-create-container')
        )
        //Portal is being used because the button and modal needs to know what ExercisePage / day they belong to
        //so we generate the modal and button here and send the react element to the parent page to retain the same layout as the previous pages
      }
      <Modal title='Create an Exercise' onClose={() => setShowCreateModal(false)} show={showCreateModal}>
        <ExerciseForm />
      </Modal>
    </>
  )
}

export default ExercisesPage;
