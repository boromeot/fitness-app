import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Modal from "../../Modal/Modal";

const Card = ({ item, showEdit, name, Form, dispatcher }) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const handleDelete = (e, cycleId) => {
    e.preventDefault();
    dispatch(dispatcher(cycleId));
  }

  const handleEdit = e => {
    e.preventDefault();
    setShowModal(true);
  }

  return (
    <>
      <div className='card-name'>
        {item.name}
      </div>
      {showEdit &&
        <>
          <div className='card-button-container'>
            <button className='edit-btn btn' onClick={handleEdit}>Edit</button>
            <button className='delete-btn btn' onClick={e => handleDelete(e, item.id)}>Delete</button>
          </div>
          <Modal title={`Edit ${name}`} onClose={() => setShowModal(false)} show={showModal} >
            <Form setShowModal={setShowModal} method='PATCH' cycleId={item.id} component={name}/>
          </Modal>
        </>
      }
    </>
  )
} 

export default Card;
