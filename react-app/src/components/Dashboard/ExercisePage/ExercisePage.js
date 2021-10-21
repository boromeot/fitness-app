import React from "react";
import { Route, useRouteMatch } from "react-router";


const ExercisePage = () => {
  const { path } = useRouteMatch();
  return (
    <div>
      <Route to={`${path}/cycles`} >
        Cycle
      </Route>
    </div>
  )
}

export default ExercisePage;
