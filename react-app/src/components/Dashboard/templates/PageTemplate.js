import React, { useState } from "react";
import Modal from "../../Modal/Modal";
import Card from "./Card";
import './CyclesPage.css';
import '../../../stylesheets/buttons.css';
import { NavLink, useRouteMatch } from "react-router-dom";

const PageWrapper = ({ data, path, name, Form, dispatcher}) => {
  const { url } = useRouteMatch();
  const [showEdit, setShowEdit] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const toggleEdit = e => {
    e.preventDefault();
    setShowEdit(prev => !prev);
  }

  const handleCreate = e => {
    e.preventDefault();
    setShowModal(true);
  }

  return (
    <div className='page-template-container'>
      <div className='page-template-button-container'>
        <button className='page-template-edit edit-btn btn' onClick={toggleEdit}>
          Edit mode
        </button>
        <button className='page-template-create primary-btn btn' onClick={handleCreate}>
          {`Create new ${name}`}
        </button>
      </div>
      <div className='card-conatiner'>
        {
          data?.map(item => {
            return (
              <NavLink to={`${url}/${item.id}/${path}`} className='card' key={item.id}>
                <Card item={item} showEdit={showEdit} name={name} Form={Form} dispatcher={dispatcher}/>
              </NavLink>
            )
          })
        }
      </div>
      <Modal title={`Create a ${name}`} onClose={() => setShowModal(false)} show={showModal}>
        <Form setShowModal={setShowModal} method='POST' component={name}/>
      </Modal>
    </div>
  )
}

export default PageWrapper;
