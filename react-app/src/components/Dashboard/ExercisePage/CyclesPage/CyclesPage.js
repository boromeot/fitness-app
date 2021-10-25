import React from "react";
import { useSelector } from "react-redux";
import PageTemplate from "../../templates/PageTemplate";
import CycleForm from "./CycleForm";
import { deleteCycle } from "../../../../store/cycles";

const CyclesPage = () => {
  const { cycles } = useSelector(state => state);

  return (
    <PageTemplate data={cycles} path='routines' name='cycle' Form={CycleForm} dispatcher={deleteCycle}/>
  )
}

export default CyclesPage;
