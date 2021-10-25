import React, { useState } from "react";
import { useSelector } from "react-redux";
import PageTemplate from "../../templates/PageTemplate";
import CycleForm from "./CycleForm";
import { deleteCycle } from "../../../../store/cycles";
import { NavLink, useRouteMatch } from 'react-router-dom';
import Card from "../../templates/Card";

const CyclesPage = () => {
  const { cycles } = useSelector(state => state);
  const { url } = useRouteMatch();
  const [showEditButtons, setShowEditButtons] = useState(false);

  return (
    <PageTemplate name='cycle' Form={CycleForm} setShowEditButtons={setShowEditButtons}>
      {
        cycles?.map(cycle => {
          return (
            <NavLink to={`${url}/${cycle.id}/routines`} className='card' key={cycle.id}>
              <Card name={'cycle'} item={cycle} showEditButtons={showEditButtons} Form={CycleForm} deleteDispatcher={deleteCycle}/>
            </NavLink>
          )
        })
      }
    </PageTemplate>
  )
}

export default CyclesPage;
