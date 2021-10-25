const GET_ROUTINES = 'routine/getRoutine';
const POST_ROUTINE = 'routine/postRoutine';

const get_routines = (routineArr) => {
  return {
    type: GET_ROUTINES,
    payload: routineArr
  };
}

const post_routine = routine => {
  return {
    type: POST_CYCLE,
    payload: routine
  };
}

export const postRoutine = (name, userId) => async dispatch => {
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
    dispatch(post_routine(routine));
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
