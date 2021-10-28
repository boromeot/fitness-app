import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

const SetForm = ({ setShowModal, method, cycleId, routineId, workId, exerciseId }) => {
  const dispatch = useDispatch();
  const { id:userId } = useSelector(state => state.session.user);
  const [reps, setReps] = useState();
  const [weight, setweight] = useState();
  const [unit, setUnit] = useState();
  const [errors, setErrors] = useState([]);

  const handleSubmit = async e => {
    e.preventDefault();
    let data;
    if (method === 'POST') {
      // data = await dispatch(postExercise(name, 'legs', userId, +cycleId, +routineId, +workId));
    } else if (method === 'PATCH') {
      // data = await dispatch(patchExercise(name, 'arms', userId, +cycleId, +routineId, +workId, exerciseId))
    }
    if (data.errors) {
      setErrors(data.errors);
    } else {
      setShowModal(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className='form-container exercise-page-form-container'>
      {errors[0] &&
        <div className='form-error exercise-page-form-error'>{errors[0]}</div>
      }
      <div>
        <input
          name='reps'
          placeholder='Number of reps'
          value={reps}
          onChange={e => setReps(e.target.value)}
          className='form-input exercise-page-form-input'
          type='number'
          min={0}
        />
        <input
          name='weight'
          placeholder='Weight'
          value={weight}
          onChange={e => setweight(e.target.value)}
          className='form-input exercise-page-form-input'
          type='number'
          min={0}
        />
        <select value={unit} onChange={e => setUnit(e.target.value)} className='form-input exercise-page-form-input'>
          <option selected value="lbs">lbs</option>
          <option value="kg">kgs</option>
        </select>
      </div>
      <button className='primary-btn btn' type='submit'>Submit</button>
    </form>
  )
}

export default SetForm;
