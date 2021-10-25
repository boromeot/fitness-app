import React, { useState } from "react";
import Modal from "../../Modal/Modal";
import './CyclesPage.css';
import '../../../stylesheets/buttons.css';

const PageTemplate = ({ Form, name, children, setShowEditButtons, cycleId}) => {
  const [showModal, setShowModal] = useState(false);

  const toggleEditMode = e => {
    e.preventDefault();
    setShowEditButtons(prev => !prev);
  }

  const handleCreate = e => {
    e.preventDefault();
    setShowModal(true);
  }

  return (
    <div className='page-template-container'>
      <div className='page-template-button-container'>
        <button className='page-template-edit edit-btn btn' onClick={toggleEditMode}>
          Edit mode
        </button>
        <button className='page-template-create primary-btn btn' onClick={handleCreate}>
          {`Create new ${name}`}
        </button>
      </div>
      <div className='card-conatiner'>
        {children}
      </div>
      <Modal title={`Create a ${name}`} onClose={() => setShowModal(false)} show={showModal}>
        <Form setShowModal={setShowModal} method='POST' component={name} cycleId={cycleId}/>
      </Modal>
    </div>
  )
}

export default PageTemplate;
