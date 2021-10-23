import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteCycle } from "../../../../store/cycles";
import Modal from "../../../Modal/Modal";
import CycleForm from "./CycleForm";

const Cycle = ({ cycle, showEdit }) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const handleDelete = (e, cycleId) => {
    e.preventDefault();
    dispatch(deleteCycle(cycleId));
  }

  const handleEdit = e => {
    e.preventDefault();
    setShowModal(true);
  }

  return (
    <>
      <div className='cycle-name'>
        {cycle.name}
      </div>
      {showEdit &&
        <>
          <div className='cycle-button-container'>
            <button className='edit-btn btn' onClick={handleEdit}>Edit</button>
            <button className='delete-btn btn' onClick={e => handleDelete(e, cycle.id)}>Delete</button>
          </div>
          <Modal title='Edit cycle' onClose={() => setShowModal(false)} show={showModal} >
            <CycleForm setShowModal={setShowModal} method='PATCH' cycleId={cycle.id}/>
          </Modal>
        </>
      }
    </>
  )
}

export default Cycle;
