import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCycle } from "../../../../store/cycles";
import Modal from "../../../Modal/Modal";
import CycleForm from "./CycleForm";
import './CyclesPage.css';
import '../../../../stylesheets/buttons.css';

const CyclesPage = () => {
  const dispatch = useDispatch();
  const { cycles } = useSelector(state => state);
  const [showEdit, setShowEdit] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);

  const toggleEdit = e => {
    e.preventDefault();
    setShowEdit(prev => !prev);
  }

  const handleCreate = e => {
    e.preventDefault();
    setShowModal(true);
  }

  const handleDelete = (e, cycleId) => {
    e.preventDefault();
    dispatch(deleteCycle(cycleId));
  }

  const handleEdit = e => {
    e.preventDefault();
    setShowModal2(true);
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
              <div key={cycle.id} className='cycle'>
                {cycle.name}
                {showEdit &&
                  <>
                    <button className='edit-btn btn' onClick={e => handleEdit(e, cycle.id)}>Edit</button>
                    <button className='delete-btn btn' onClick={e => handleDelete(e, cycle.id)} key={cycle.id}>Delete</button>
                      {cycle.id}
                    <Modal title='Edit cycle' onClose={() => setShowModal2(false)} show={showModal2} >
                      {cycle.id}
                      <CycleForm setShowModal={setShowModal2} method='PATCH' cycleId={cycle.id}/>
                    </Modal>
                  </>
                }
              </div>
            )
          })
        }
      </div>
      <Modal title='Create a cycle' onClose={() => setShowModal(false)} show={showModal}>
        <CycleForm setShowModal={setShowModal} method='POST'/>
      </Modal>
    </div>
  )
}

export default CyclesPage;
