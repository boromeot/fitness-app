import React, { useState } from "react";
import { useParams, NavLink, useRouteMatch, Route } from "react-router-dom";
import Modal from "../../../Modal/Modal";
import DayPage from "./DayPage";
import ExerciseForm from "./ExerciseForm";
import './RoutinePage.css';


const capitalize = (word) => {
  return `${word[0].toLocaleUpperCase()}${word.slice(1)}`;
}

const RoutinePage = () => {
  const { userId, cycleId, routineId } = useParams();
  const { path, url } = useRouteMatch();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

  const handleCreate = e => {
    e.preventDefault();
    setShowCreateModal(true);
  }

  return (
    <div className='page-template-container'>
      <div className='page-template-button-container'>
        <div className='page-template-edit-delete-container'>
          <button className='page-template-create primary-btn btn' onClick={handleCreate}>
            Create new Exercise
          </button>
        </div>
        <NavLink to={`/users/${userId}/dashboard/exercise/cycles/${cycleId}/routines`} className='back-btn btn'>
          Back
        </NavLink>
      </div>
      <div className='routine-page-days-container'>
        {
          days.map((day, i) => {
            return <NavLink to={`${url}/${day}`} className='routine-page-day' key={i}>{capitalize(day)}</NavLink>
          })
        }
      </div>

      <Route path={`${path}/:day`}>
        <DayPage />
      </Route>

      <Modal title='Create an Exercise' onClose={() => setShowCreateModal(false)} show={showCreateModal}>
        <ExerciseForm />
      </Modal>
    </div>
  )
}

export default RoutinePage;
