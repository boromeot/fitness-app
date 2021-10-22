import React, { useEffect } from "react";
import { Route, useRouteMatch } from "react-router";
import CyclesPage from "./CyclesPage/CyclesPage";
import { useDispatch, useSelector } from "react-redux";
import { getCycles } from "../../../store/cycles";

const ExercisePage = () => {
  const { path } = useRouteMatch();
  const dispatch = useDispatch();
  const { id:userId } = useSelector(state => state.session.user);
  useEffect(() => {
    dispatch(getCycles(userId));
  }, [dispatch, userId])
  return (
    <div>
      <Route path={`${path}/cycles`} >
        <CyclesPage />
      </Route>
      <Route path={`${path}/routines`} >
        Routines
      </Route>
      <Route path={`${path}/exercises`} >
        Exercises
      </Route>
    </div>
  )
}

export default ExercisePage;
