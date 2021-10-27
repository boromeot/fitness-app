export const POST_WORKOUT = 'workout/postWorkout';

const post_workout = (workout, cycleId, routineId) => {
  return {
    type: POST_WORKOUT,
    payload: {
      workout,
      cycleId,
      routineId
    }
  };
}

export const postWorkout = (day, user_id, routine_id, cycle_id) => async dispatch => {
  const response = await fetch(`/api/workouts/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      day,
      user_id,
      routine_id
    })
  });

  if (response.ok) {
    const workout = await response.json();
    dispatch(post_workout(workout, cycle_id, routine_id));
    return workout;
  }
  else {
    const data = await response.json();
    return data;
  }
}
