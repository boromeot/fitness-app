import React from "react";
import { useDispatch } from "react-redux";
import { postCycle } from "../../../../store/cycles";
import './CyclesPage.css';

const CyclesPage = () => {
  const dispatch = useDispatch();

  const handleClick = e => {
    e.preventDefault();
    dispatch(postCycle('test', 2))
  }

  return (
    <div className='cycles-page-container'>
      <div className='cycles-page-button-container'>
        <button className='cycles-page-create' onClick={handleClick}>
          Create new cycle
        </button>
      </div>

    </div>
  )
}

export default CyclesPage;
