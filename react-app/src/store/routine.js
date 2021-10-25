const GET_ROUTINES = 'routine/getRoutine';
export const POST_ROUTINE = 'routine/postRoutine';

const get_routines = (routineArr) => {
  return {
    type: GET_ROUTINES,
    payload: routineArr
  };
}

const post_routine = (routine, cycleId) => {
  return {
    type: POST_CYCLE,
    payload: {
      routine,
      cycleId
    }
  };
}

//Create a new routine in the database
//Append the new routine the the associated cycle routine array
export const postRoutine = (name, userId, cycleId) => async dispatch => {
  const response = await fetch(`/api/routines/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name,
      user_id: userId
    })
  });
  if (response.ok) {
    const routine = await response.json();
    dispatch(post_routine(routine, cycleId));
    return routine;
  }
  else {
    const data = await response.json();
    return data;
  }
}

//Get routines by cycle id
export const getRoutines = (cycleId) => async dispatch => {

}
