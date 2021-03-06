export const POST_ROUTINE = 'routine/postRoutine';
export const DELETE_ROUTINE = 'routine/deleteRoutine';
export const PATCH_ROUTINE = 'routine/patchRoutine';

const post_routine = (routine, cycleId) => {
  return {
    type: POST_ROUTINE,
    payload: {
      routine,
      cycleId
    }
  };
}

const delete_routine = (routineId, cycleId) => {
  return {
    type: DELETE_ROUTINE,
    payload: {
      routineId,
      cycleId
    }
  };
}

const patch_routine = (routine, cycleId, routineId) => {
  return {
    type: PATCH_ROUTINE,
    payload: {
      routine,
      cycleId,
      routineId
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

export const deleteRoutine = (routineId, cycleId) => async dispatch => {
  const response = await fetch(`/api/routines/${routineId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      routine_id: routineId
    })
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(delete_routine(routineId, cycleId));
    return data;
  }
}

export const patchRoutine = (name, userId, cycleId, routineId) => async dispatch => {
  const response = await fetch(`/api/routines/${routineId}`, {
    method: 'PATCH',
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
    dispatch(patch_routine(routine, cycleId, routineId));
    return routine;
  } else {
    const data = await response.json();
    return data;
  }
}
