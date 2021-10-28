export const POST_SET = 'set/postSet';

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
