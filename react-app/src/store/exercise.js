export const POST_EXERCISE = 'exercise/postExercise';

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
