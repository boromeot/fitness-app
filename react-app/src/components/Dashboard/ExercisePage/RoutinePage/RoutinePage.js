import React from "react";
import { useParams, NavLink, useRouteMatch, Route } from "react-router-dom";
import ExercisesPage from "./ExercisesPage";
import './RoutinePage.css';


const capitalize = (word) => {
  return `${word[0].toLocaleUpperCase()}${word.slice(1)}`;
}

const RoutinePage = () => {
  const { userId, cycleId, routineId } = useParams();
  const { path, url } = useRouteMatch();
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

  return (
    <div className='page-template-container'>
      <div className='page-template-button-container'>
        <div className='page-template-edit-delete-container' id='routine-page-create-container'>
          {/*A portal will be created to this container */}
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
        <ExercisesPage />
      </Route>
    </div>
  )
}

export default RoutinePage;
