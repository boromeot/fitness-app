import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { patchSet, postSet } from "../../../../store/set";

const SetForm = ({ set, setShowModal, method}) => {
  const { cycleId, routineId, workId, exerciseId } = useParams();
  const dispatch = useDispatch();
  const { id:userId } = useSelector(state => state.session.user);
  const [totalReps, setTotalReps] = useState(set?.total_reps);
  const [weight, setweight] = useState(set?.weight);
  const [unit, setUnit] = useState(set?.unit || 'lb');
  const [errors, setErrors] = useState([]);

  const handleSubmit = async e => {
    e.preventDefault();
    let data;
    if (method === 'POST') {
      data = await dispatch(postSet(totalReps, weight, unit, userId, +cycleId, +routineId, +workId, +exerciseId));
    } else if (method === 'PATCH') {
      data = await dispatch(patchSet(0, totalReps, weight, unit, userId, +cycleId, +routineId, +workId, +exerciseId, set.id));
    }
    if (data.errors) {
      setErrors(data.errors);
    } else {
      setShowModal(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className='form-container exercise-page-form-container'>
      {errors?.map(error => {
          return <div className='form-error exercise-page-form-error'>{error}</div>
        })
      }
      <div>
        <input
          name='totalReps'
          placeholder='Number of total reps'
          value={totalReps}
          onChange={e => setTotalReps(e.target.value)}
          className='form-input exercise-page-form-input'
          type='number'
          min={0}
          max={9999}
        />
        <input
          name='weight'
          placeholder='Weight'
          value={weight}
          onChange={e => setweight(e.target.value)}
          className='form-input exercise-page-form-input'
          type='number'
          min={0}
          max={9999}
        />
        <select value={unit} onChange={e => setUnit(e.target.value)} className='form-input exercise-page-form-input'>
          <option selected value="lb">lb</option>
          <option value="kg">kg</option>
        </select>
      </div>
      <button className='primary-btn btn' type='submit'>Submit</button>
    </form>
  )
}

export default SetForm;
