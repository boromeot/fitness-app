import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { postCycle } from "../../../../store/cycles";
import './CycleForm.css';

const CycleForm = ({ setShowModal }) => {
  const dispatch = useDispatch();
  const { id:userId } = useSelector(state => state.session.user);
  const [name, setName] = useState('');
  const [errors, setErrors] = useState([]);

  const handleSubmit = async e => {
    e.preventDefault();
    setErrors([]);
    const data = await dispatch(postCycle(name, userId))
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
    <form onSubmit={handleSubmit} className='form-container'>
      {errors[0] &&
        <div className='form-error'>{errors[0]}</div>
      }
      <div>
        <input
          name='name'
          placeholder='Cycle name'
          value={name}
          onChange={handleChange}
          className='form-input'
        />
      </div>
      <button className='primary-btn btn' type='submit'>Submit</button>
    </form>
  )
}

export default CycleForm;
