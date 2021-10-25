import React, { useEffect, useState } from "react";
import { Route, useRouteMatch } from "react-router";
import CyclesPage from "./CyclesPage/CyclesPage";
import { useDispatch, useSelector } from "react-redux";
import { getCycles } from "../../../store/cycles";
import RoutinePage from "./RoutinePage/RoutinePage";

const ExercisePage = () => {
  const { path } = useRouteMatch();
  const dispatch = useDispatch();
  const { id:userId } = useSelector(state => state.session.user);
  const [loaded, setLoaded] = useState(false);

  //Most children components rely on the information this dispatch fetches
  //So we must wait for its response before doing anything
  useEffect(async () => {
    await dispatch(getCycles(userId));
    setLoaded(true);
  }, [dispatch, userId])

  if (!loaded) {
    return null;
  }

  return (
    <>
      <Route path={`${path}/cycles`} exact>
        <CyclesPage />
      </Route>
      <Route path={`${path}/cycles/:cycleId/routines`} >
        <RoutinePage />
      </Route>
      <Route path={`${path}/routines`} exact>
        Routines
      </Route>
      <Route path={`${path}/exercises`} exact>
        Exercises
      </Route>
    </>
  )
}

export default ExercisePage;
