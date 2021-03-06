import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { patchCycle, postCycle } from "../../../../store/cycles";

const CycleForm = ({ cycle, setShowModal, method  }) => {
  const dispatch = useDispatch();
  const { id:userId } = useSelector(state => state.session.user);
  const [name, setName] = useState(cycle?.name);
  const [errors, setErrors] = useState([]);

  const handleSubmit = async e => {
    e.preventDefault();
    setErrors([]);
    let data;
    if (method === 'POST') {
      data = await dispatch(postCycle(name, userId))
    } else if (method === 'PATCH') {
      data = await dispatch(patchCycle(name, userId, cycle.id))
    }
    if (data.errors) {
      setErrors(data.errors);
    } else {
      setShowModal(false);
    }
  }

  const handleChange = e => {
    e.preventDefault();
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
          placeholder='Cycle name'
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

export default CycleForm;
