import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, NavLink, useRouteMatch } from 'react-router-dom';
import PageTemplate from '../../templates/PageTemplate';

const RoutinePage = () => {
  const { cycleId } = useParams();
  const { routines } = useSelector(state => state.cycles.find(cycle => cycle.id === +cycleId));
  const { url } = useRouteMatch();
  const [showEditButtons, setShowEditButtons] = useState(false);

  return (
    <>
      <PageTemplate name='routine' setShowEditButtons={setShowEditButtons}>
        {
          routines?.map(routine => {
            return (
              <NavLink to={`${url}/${routine.id}`} className='card' key={routine.id}>

              </NavLink>
            )
          })
        }
      </PageTemplate>
    </>
  )
}

export default RoutinePage;
