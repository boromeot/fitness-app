import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { patchRoutine, postRoutine } from "../../../../store/routine";
import { postWeeklyWorkout } from "../../../../store/workout";

const RoutineForm = ({ routine, setShowModal, method, cycleId, routineId }) => {
  const dispatch = useDispatch();
  const { id:userId } = useSelector(state => state.session.user);
  const [name, setName] = useState(routine?.name);
  const [errors, setErrors] = useState([]);

  const handleSubmit = async e => {
    e.preventDefault();
    let newRoutine;
    if (method === 'POST') {
      //Creates a new Routine
      newRoutine = await dispatch(postRoutine(name, userId, +cycleId));
      //Instanitates the new routine with default daily workouts
      await dispatch(postWeeklyWorkout(userId, newRoutine.id, +cycleId))
    } else if (method === 'PATCH') {
      newRoutine = await dispatch(patchRoutine(name, userId, +cycleId, routineId));
    }
    if (newRoutine.errors) {
      setErrors(newRoutine.errors);
    } else {
      setShowModal(false);
    }
  }

  const handleChange = e => {
    setName(e.target.value);
  }

  return (
    <form onSubmit={handleSubmit} className='form-container exercise-page-form-container'>
      {errors[0] &&
        <div className='form-error exercise-page-form-error'>{errors[0]}</div>
      }
      <div>
        <input
          name='name'
          placeholder='Routine name'
          value={name}
          onChange={handleChange}
          className='form-input exercise-page-form-input'
          maxLength={25}
        />
        <div className='char-limit'>{`${name ? name.length : 0} / 25`}</div>
      </div>
      <button className='primary-btn btn' type='submit'>Submit</button>
    </form>
  )
}

export default RoutineForm;
