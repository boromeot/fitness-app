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

//Get routines by cycle id
export const getRoutines = (cycleId) => async dispatch => {

}
