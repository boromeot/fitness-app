import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

const DayPage = () => {
  const { cycleId, routineId, day } = useParams();
  const cycles = useSelector(state => state.cycles)
  const currentCycle = cycles.find(cycle => cycle.id === +cycleId);
  const currentRoutine = currentCycle.routines.find(routine => routine.id === +routineId);
  const currentDay = currentRoutine.workouts.find(workout => workout.day === day);

  console.log(currentDay);
  return (
    <div className='card-container'>
      {
        currentDay?.exercises.map(exercise => {
          return <div className='card'> {exercise.name} </div>
        })
      }
    </div>
  )
}

export default DayPage;
