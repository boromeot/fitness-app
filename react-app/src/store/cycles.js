const GET_CYCLES = 'cycles/getCycles'
const POST_CYCLE = 'cycles/postCycle'

const get_cycles = (cyclesArr) => {
  return {
    type: GET_CYCLES,
    payload: cyclesArr
  };
}

const post_cycle = (cycle) => {
  return {
    type: POST_CYCLE,
    payload: cycle
  };
}

export const getCycles = (userId) => async dispatch => {
  const response = await fetch(`/api/cycles/${userId}`);
  const cyclesArr = await response.json();
  dispatch(get_cycles(cyclesArr));
  return response;
}

export const postCycle = (name, userId) => async dispatch => {
  const response = await fetch(`/api/cycles/`, {
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
    const cycle = await response.json();
    dispatch(post_cycle(cycle));
    return cycle;
  }
  else {
    const data = await response.json();
    return data.errors ? data.errors : null;
  }
}

export default function cycles(state = [], action) {
  let newState;
  switch (action.type) {
    case GET_CYCLES:
      newState = action.payload;
      return newState;
    case POST_CYCLE:
      newState = [...state];
      newState.push(action.payload);
      return newState;
    default:
      return state;
  }
}
