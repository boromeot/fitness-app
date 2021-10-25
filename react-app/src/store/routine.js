export const POST_ROUTINE = 'routine/postRoutine';

const post_routine = (routine, cycleId) => {
  return {
    type: POST_ROUTINE,
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
      user_id: userId,
      cycle_id: cycleId
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
