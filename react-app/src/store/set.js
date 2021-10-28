export const POST_SET = 'set/postSet';
export const DELETE_SET = 'set/deleteSet';

const post_set = (set, cycleId, routineId, workId, exerciseId) => {
  return {
    type: POST_SET,
    payload: {
      set,
      cycleId,
      routineId,
      workId,
      exerciseId
    }
  }
}

const delete_set = (cycleId, routineId, workId, exerciseId, setId) => {
  return {
    type: DELETE_SET,
    payload: {
      cycleId,
      routineId,
      workId,
      exerciseId,
      setId
    }
  }
}

export const postSet = (total_reps, weight, unit, user_id, cycleId, routineId, workId, exercise_id) => async dispatch => {
  console.log(user_id, exercise_id, 'from thunk');
  const response = await fetch(`/api/sets/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      total_reps,
      weight,
      unit,
      user_id,
      exercise_id
    })
  });
  if (response.ok) {
    const set = await response.json();
    dispatch(post_set(set, cycleId, routineId, workId, exercise_id));
    return set;
  }
  else {
    const data = await response.json();
    return data;
  }
}

export const deleteSet = (cycleId, routineId, workId, exerciseId, set_id) => async dispatch => {
  const response = await fetch(`/api/set/${set_id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      set_id
    })
  })
  if (response.ok) {
    const data = await response.json();
    dispatch(delete_exercise(cycleId, routineId, workId, exerciseId, set_id));
    return data;
  }
}
