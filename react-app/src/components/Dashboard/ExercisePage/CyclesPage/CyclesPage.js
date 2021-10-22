import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { postCycle } from "../../../../store/cycles";
import './CyclesPage.css';
import '../../../../stylesheets/buttons.css';

const CyclesPage = () => {
  const dispatch = useDispatch();
  const { id:userId } = useSelector(state => state.session.user);

  const handleClick = e => {
    e.preventDefault();
    dispatch(postCycle('test', userId))
  }

  return (
    <div className='cycles-page-container'>
      <div className='cycles-page-button-container'>
        <button className='cycles-page-create primary-btn btn' onClick={handleClick}>
          Create new cycle
        </button>
      </div>

    </div>
  )
}

export default CyclesPage;
