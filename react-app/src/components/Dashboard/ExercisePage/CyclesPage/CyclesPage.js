import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postCycle } from "../../../../store/cycles";
import './CyclesPage.css';
import '../../../../stylesheets/buttons.css';

const CyclesPage = () => {
  const dispatch = useDispatch();
  const { id:userId } = useSelector(state => state.session.user);
  const { cycles } = useSelector(state => state);
  const [showEdit, setShowEdit] = useState(false);

  const toggleEdit = e => {
    e.preventDefault();
    setShowEdit(prev => !prev);
  }

  const handleCreate = e => {
    e.preventDefault();
    dispatch(postCycle('test', userId))
  }

  const handleDelete = e => {
    e.preventDefault();
    
  }

  return (
    <div className='cycles-page-container'>
      <div className='cycles-page-button-container'>
        <button className='cycles-page-edit edit-btn btn' onClick={toggleEdit}>
          Edit mode
        </button>
        <button className='cycles-page-create primary-btn btn' onClick={handleCreate}>
          Create new cycle
        </button>
      </div>
      <div className='cycle-conatiner'>
        {
          cycles?.map(cycle => {
            return (
              <div className='cycle'>
                {cycle.name}
                {showEdit &&
                  <>
                    <button className='edit-btn btn'>Edit</button>
                    <button className='delete-btn btn'>Delete</button>
                  </>
                }
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default CyclesPage;
