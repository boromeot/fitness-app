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
        cycles?.map(item => {
          return (
            <NavLink to={`${url}/${item.id}/routines`} className='card' key={item.id}>
              <Card item={item} showEditButtons={showEditButtons} name={'cycle'} Form={CycleForm} dispatcher={deleteCycle}/>
            </NavLink>
          )
        })
      }
    </PageTemplate>
  )
}

export default CyclesPage;
