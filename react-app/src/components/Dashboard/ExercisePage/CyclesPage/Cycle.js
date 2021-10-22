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
    <div key={cycle.id} className='cycle'>
      {cycle.name}
      {showEdit &&
        <>
          <button className='edit-btn btn' onClick={handleEdit}>Edit</button>
          <button className='delete-btn btn' onClick={e => handleDelete(e, cycle.id)}>Delete</button>
            {cycle.id}
          <Modal title='Edit cycle' onClose={() => setShowModal(false)} show={showModal} >
            {cycle.id}
            <CycleForm setShowModal={setShowModal} method='PATCH' cycleId={cycle.id}/>
          </Modal>
        </>
      }
    </div>
  )
}

export default Cycle;