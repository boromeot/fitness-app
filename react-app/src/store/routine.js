const GET_ROUTINES = 'cycles/getRoutine';

const get_routines = (routineArr) => {
  return {
    type: GET_ROUTINES,
    payload: routineArr
  };
}

export const getRoutines = (cycleId) => async dispatch => {
  
}
