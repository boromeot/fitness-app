import React from "react";
import { Route, useRouteMatch } from "react-router";
import CyclesPage from "./CyclesPage/CyclesPage";


const ExercisePage = () => {
  const { path } = useRouteMatch();
  return (
    <div>
      <Route path={`${path}/cycles`} exact>
        <CyclesPage />
      </Route>
      <Route path={`${path}/routines`} exact>
        Routines
      </Route>
      <Route path={`${path}/exercises`} exact>
        Exercises
      </Route>
    </div>
  )
}

export default ExercisePage;
