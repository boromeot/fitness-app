import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, NavLink, useRouteMatch } from 'react-router-dom';
import Card from '../../templates/Card';
import PageTemplate from '../../templates/PageTemplate';
import RoutineForm from './RoutineForm';

const RoutinePage = () => {
  const { cycleId } = useParams();
  const { cycles } = useSelector(state => state);
  const { url } = useRouteMatch();
  const [showEditButtons, setShowEditButtons] = useState(false);
  const currentCycle = cycles.find(cycle => cycle.id === +cycleId);
  return (
    <PageTemplate name='routine' Form={RoutineForm} setShowEditButtons={setShowEditButtons} cycleId={+cycleId}>
      {
        currentCycle.routines?.map(routine => {
          return (
            <NavLink to={`${url}/${routine.id}`} className='card' key={routine.id}>
              <Card name='routine' item={routine} showEditButtons={showEditButtons} Form={RoutineForm} deleteDispatcher={null}/>
            </NavLink>
          )
        })
      }
    </PageTemplate>
  )
}

export default RoutinePage;
