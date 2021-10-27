export const POST_WORKOUT = 'workout/postWorkout';
export const POST_WEEKLY_WORKOUT = 'workout/postWeeklyWorkout';

const post_weekly_workout = (workouts, cycleId, routineId) => {
  return {
    type: POST_WEEKLY_WORKOUT,
    payload: {
      workouts,
      cycleId,
      routineId
    }
  };
}

export const postWeeklyWorkout = (user_id, routine_id, cycle_id) => async dispatch => {
  const response = await fetch(`/api/workouts/weekly`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      user_id,
      routine_id
    })
  });

  if (response.ok) {
    const workouts = await response.json();
    dispatch(post_workout(workouts, cycle_id, routine_id));
    return workouts;
  }
  else {
    const data = await response.json();
    return data;
  }

}

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
