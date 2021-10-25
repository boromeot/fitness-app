import { POST_ROUTINE } from "./routine";

const GET_CYCLES = 'cycles/getCycles';
const POST_CYCLE = 'cycles/postCycle';
const DELETE_CYCLE = 'cycles/deleteCycle';
const PATCH_CYCLE = 'cycles/patchCycle';

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

const delete_cycle = (cycleId) => {
  return {
    type: DELETE_CYCLE,
    payload: cycleId
  };
}

const patch_cycle = (cycle) => {
  return {
    type: PATCH_CYCLE,
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
    return data;
  }
}


export const deleteCycle = (cycleId) => async dispatch => {
  const reponse = await fetch(`/api/cycles/${cycleId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      cycle_id: cycleId
    })
  });

  if (reponse.ok) {
    const data = await reponse.json();
    dispatch(delete_cycle(cycleId));
    return data;
  }
}


export const patchCycle = (name, userId, cycleId) => async dispatch => {
  const response = await fetch(`/api/cycles/${cycleId}`, {
    method: 'PATCH',
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
    dispatch(patch_cycle(cycle));
    return cycle;
  } else {
    const data = await response.json();
    return data;
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
    case DELETE_CYCLE:
      newState = state.filter(cycle => {
        return cycle.id !== action.payload;
      });
      return newState;
    case PATCH_CYCLE:
      newState = [...state];
      const i = newState.findIndex(cycle => cycle.id === action.payload.id);
      newState[i].name = action.payload.name;
      return newState;

    case POST_ROUTINE:
      newState = [...state];
      const j = newState.findIndex(cycle => cycle.id === action.payload.cycleId);
      newState[j].routines.push(action.payload.routine);
      return newState;
    default:
    return state;
  }
}
