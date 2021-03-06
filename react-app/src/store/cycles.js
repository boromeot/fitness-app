import { POST_ROUTINE, DELETE_ROUTINE, PATCH_ROUTINE } from "./routine";
import { POST_WORKOUT, POST_WEEKLY_WORKOUT } from "./workout";
import { DELETE_EXERCISE, POST_EXERCISE, PATCH_EXERCISE } from "./exercise";
import { POST_SET, DELETE_SET, PATCH_SET } from "./set";

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
  let i;
  let j;
  let k;
  let l;
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
      i = newState.findIndex(cycle => cycle.id === action.payload.id);
      newState[i].name = action.payload.name;
      return newState;
    //Routines
    case POST_ROUTINE:
      newState = [...state];
      i = newState.findIndex(cycle => cycle.id === action.payload.cycleId);
      newState[i].routines.push(action.payload.routine);
      return newState;
    case DELETE_ROUTINE:
      newState = [...state];
      i = newState.findIndex(cycle => cycle.id === action.payload.cycleId);
      newState[i].routines = newState[i].routines.filter(routine => {
        return routine.id !== action.payload.routineId;
      });
      return newState;
    case PATCH_ROUTINE:
      newState = [...state];
      i = newState.findIndex(cycle => cycle.id === action.payload.cycleId);
      j = newState[i].routines.findIndex(routine => routine.id === action.payload.routineId);
      newState[i].routines[j].name = action.payload.routine.name;
      return newState;
    //Workouts
    case POST_WORKOUT:
      newState = [...state];
      i = newState.findIndex(cycle => cycle.id === action.payload.cycleId);
      j = newState[i].routines.findIndex(routine => routine.id === action.payload.routineId);
      newState[i].routines[j].workouts.push(action.payload.workout);
      return newState;
    case POST_WEEKLY_WORKOUT:
      newState = [...state];
      i = newState.findIndex(cycle => cycle.id === action.payload.cycleId);
      j = newState[i].routines.findIndex(routine => routine.id === action.payload.routineId);
      newState[i].routines[j].workouts = action.payload.workouts;
      return newState;
    //Exercises
    case POST_EXERCISE:
      newState = [...state];
      i = newState.findIndex(cycle => cycle.id === action.payload.cycleId);
      j = newState[i].routines.findIndex(routine => routine.id === action.payload.routineId);
      k = newState[i].routines[j].workouts.findIndex(workout => workout.id === action.payload.workId)
      newState[i].routines[j].workouts[k].exercises.push(action.payload.exercise);
      return newState;
    case DELETE_EXERCISE:
      newState = [...state];
      i = newState.findIndex(cycle => cycle.id === action.payload.cycleId);
      j = newState[i].routines.findIndex(routine => routine.id === action.payload.routineId);
      k = newState[i].routines[j].workouts.findIndex(workout => workout.id === action.payload.workId)
      newState[i].routines[j].workouts[k].exercises= newState[i].routines[j].workouts[k].exercises.filter(exercise => {
        return exercise.id !== action.payload.exerciseId;
      })
      return newState;
    case PATCH_EXERCISE:
      newState = [...state];
      i = newState.findIndex(cycle => cycle.id === action.payload.cycleId);
      j = newState[i].routines.findIndex(routine => routine.id === action.payload.routineId);
      k = newState[i].routines[j].workouts.findIndex(workout => workout.id === action.payload.workId);
      l = newState[i].routines[j].workouts[k].exercises.findIndex(exercise => exercise.id === action.payload.exerciseId);
      newState[i].routines[j].workouts[k].exercises[l].name = action.payload.exercise.name;
      newState[i].routines[j].workouts[k].exercises[l].body_part = action.payload.exercise.body_part;
      return newState;

    case POST_SET:
      newState = [...state];
      i = newState.findIndex(cycle => cycle.id === action.payload.cycleId);
      j = newState[i].routines.findIndex(routine => routine.id === action.payload.routineId);
      k = newState[i].routines[j].workouts.findIndex(workout => workout.id === action.payload.workId);
      l = newState[i].routines[j].workouts[k].exercises.findIndex(exercise => exercise.id === action.payload.exerciseId);
      newState[i].routines[j].workouts[k].exercises[l].sets.push(action.payload.set);
      return newState;
    case DELETE_SET:
      newState = [...state];
      i = newState.findIndex(cycle => cycle.id === action.payload.cycleId);
      j = newState[i].routines.findIndex(routine => routine.id === action.payload.routineId);
      k = newState[i].routines[j].workouts.findIndex(workout => workout.id === action.payload.workId)
      l = newState[i].routines[j].workouts[k].exercises.findIndex(exercise => exercise.id === action.payload.exerciseId);
      newState[i].routines[j].workouts[k].exercises[l].sets = newState[i].routines[j].workouts[k].exercises[l].sets.filter(set => {
        return set.id !== action.payload.setId;
      });
      return newState;
    case PATCH_SET:
      newState = [...state];
      i = newState.findIndex(cycle => cycle.id === action.payload.cycleId);
      j = newState[i].routines.findIndex(routine => routine.id === action.payload.routineId);
      k = newState[i].routines[j].workouts.findIndex(workout => workout.id === action.payload.workId)
      l = newState[i].routines[j].workouts[k].exercises.findIndex(exercise => exercise.id === action.payload.exerciseId);
      let m = newState[i].routines[j].workouts[k].exercises[l].sets.findIndex(set => set.id === action.payload.setId);
      newState[i].routines[j].workouts[k].exercises[l].sets[m] = action.payload.set;
      return newState;
    default:
      return state;
  }
}
