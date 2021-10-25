import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import PageTemplate from '../../templates/PageTemplate';

const RoutinePage = () => {
  const { cycleId } = useParams();
  const { routines } = useSelector(state => state.cycles.find(cycle => cycle.id === +cycleId));

  console.log(routines, 'routines');
  return (
    <>
      {routines[0]?.name}
    </>
  )
}

export default RoutinePage;
