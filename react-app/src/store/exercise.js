export const POST_EXERCISE = 'exercise/postExercise';
export const DELETE_EXERCISE = 'exercise/deleteExercise';
export const PATCH_EXERCISE = 'exercise/patchExercise';

const post_exercise = (exercise, cycleId, routineId, workId) => {
  return {
    type: POST_EXERCISE,
    payload: {
      exercise,
      cycleId,
      routineId,
      workId
    }
  };
}

const delete_exercise = (cycleId, routineId, workId, exerciseId) => {
  return {
    type: DELETE_EXERCISE,
    payload: {
      cycleId,
      routineId,
      workId,
      exerciseId
    }
  }
}

const patch_exercise = (exercise, cycleId, routineId, workId, exerciseId) => {
  return {
    type: PATCH_EXERCISE,
    payload: {
      exercise,
      cycleId,
      routineId,
      workId,
      exerciseId
    }
  }
}

export const postExercise = (name, body_part, user_id, cycleId, routineId, work_id) => async dispatch => {
  const response = await fetch(`/api/exercises/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name,
      body_part,
      user_id,
      work_id
    })
  });
  if (response.ok) {
    const exercise = await response.json();
    dispatch(post_exercise(exercise, cycleId, routineId, work_id));
    return exercise;
  }
  else {
    const data = await response.json();
    return data;
  }
}

export const deleteExercise = (cycleId, routineId, workId, exercise_id) => async dispatch => {
  const response = await fetch(`/api/exercises/${exercise_id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      exercise_id
    })
  })
  if (response.ok) {
    const data = await response.json();
    dispatch(delete_exercise(cycleId, routineId, workId, exercise_id));
    return data;
  }
}

export const patchExercise = (name, body_part, user_id, cycle_id, routine_id, work_id, exerciseId) => async dispatch => {
  const response = await fetch(`/api/exercises/${exerciseId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name,
      body_part,
      user_id,
      work_id
    })
  });
  if (response.ok) {
    const exercise = await response.json();
    dispatch(patch_exercise(exercise, cycle_id, routine_id, work_id, exerciseId));
    return exercise;
  } else {
    const data = await response.json();
    return data;
  }
}
