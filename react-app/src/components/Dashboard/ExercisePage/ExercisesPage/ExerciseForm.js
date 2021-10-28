import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { patchExercise, postExercise } from "../../../../store/exercise";

const ExerciseForm = ({ exercise, setShowModal, method, cycleId, routineId, workId, exerciseId }) => {
  const dispatch = useDispatch();
  const { id:userId } = useSelector(state => state.session.user);
  const [name, setName] = useState(exercise?.name);
  const [errors, setErrors] = useState([]);

  const handleSubmit = async e => {
    e.preventDefault();
    let data;
    if (method === 'POST') {
      data = await dispatch(postExercise(name, 'legs', userId, +cycleId, +routineId, +workId));
    } else if (method === 'PATCH') {
      data = await dispatch(patchExercise(name, 'arms', userId, +cycleId, +routineId, +workId, exerciseId))
    }
    if (data.errors) {
      setErrors(data.errors);
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
          placeholder='Exercise name'
          value={name}
          onChange={handleChange}
          className='form-input exercise-page-form-input'
          maxLength={25}
        />
        <div>{`${name ? name.length : 0} / 25`}</div>
      </div>
      <button className='primary-btn btn' type='submit'>Submit</button>
    </form>
  )
}

export default ExerciseForm;
