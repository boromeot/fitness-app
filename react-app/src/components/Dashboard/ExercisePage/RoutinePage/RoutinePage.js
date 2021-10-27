import React from "react";
import { useParams, NavLink, useRouteMatch, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import ExercisesPage from "./ExercisesPage";
import './RoutinePage.css';


const capitalize = (word) => {
  return `${word[0].toLocaleUpperCase()}${word.slice(1)}`;
}

const RoutinePage = () => {
  const { userId, cycleId, routineId } = useParams();
  const { path, url } = useRouteMatch();
  const { cycles } = useSelector(state => state);
  const currentCycle = cycles.find(cycle => cycle.id === +cycleId);
  const currentRoutine = currentCycle.routines.find(routine => routine.id === +routineId);

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
          currentRoutine?.workouts.map(workout => {
            return <NavLink to={`${url}/workouts/${workout.id}`} className='routine-page-day' key={workout.id}>{capitalize(workout.day)}</NavLink>
          })
        }
      </div>
      <Route path={`${path}/workouts/:workId`}>
        <ExercisesPage />
      </Route>
    </div>
  )
}

export default RoutinePage;
