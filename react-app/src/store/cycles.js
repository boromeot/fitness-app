const GET_CYCLES = 'cycles/getCycles'

const get_cycles = (cyclesArr) => {
  return {
    type: GET_CYCLES,
    payload: cyclesArr
  };
}

export const getCycles = (userId) => async dispatch => {
  const response = await fetch(`/api/cycles/${userId}`);
  const cyclesArr = await response.json();
  dispatch(get_cycles(cyclesArr));
  return response;
}



export default function cycles(state = {}, action) {
  let newState;
  switch (action.type) {
    case GET_CYCLES:
      newState = action.payload;
      return newState;
    default:
      return state;
  }
}
