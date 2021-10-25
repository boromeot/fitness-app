import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { postRoutine } from "../../../../store/routine";
import '../CyclesPage/CycleForm.css';

const RoutineForm = ({ setShowModal, method, cycleId, component }) => {
  const dispatch = useDispatch();
  const { id:userId } = useSelector(state => state.session.user);
  const [name, setName] = useState('');
  const [errors, setErrors] = useState([]);

  const handleSubmit = async e => {
    e.preventDefault();
    setErrors([]);
    let data;
    if (method === 'POST') {
      data = await dispatch(postRoutine(name, userId, +cycleId))
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
    <form onSubmit={handleSubmit} className='form-container cycle-form-container'>
      {errors[0] &&
        <div className='form-error cycle-form-error'>{errors[0]}</div>
      }
      <div>
        <input
          name='name'
          placeholder={`${component} name`}
          value={name}
          onChange={handleChange}
          className='form-input cycle-form-input'
        />
      </div>
      <button className='primary-btn btn' type='submit'>Submit</button>
    </form>
  )
}

export default RoutineForm;
