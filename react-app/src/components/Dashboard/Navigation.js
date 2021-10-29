import React from "react";
import { useSelector } from "react-redux";
import { NavLink, useRouteMatch } from "react-router-dom";
import LogoutButton from '../auth/LogoutButton';
import './Navigation.css';

const Navigation = ({ children }) => {
  const { username } = useSelector(state => state.session.user);
  const { url } = useRouteMatch();
  return (
    <nav className='navigation-container'>
      {/* <NavLink to={`${url}/exercise/cycles`} className='navigation-cycle'>
        Cycles
      </NavLink> */}
      {/* <NavLink to={`${url}/exercise/routines`} className='navigation-cycle'>
        Routines
      </NavLink>
      <NavLink to={`${url}/exercise/exercises`} className='navigation-cycle'>
        Exercises
      </NavLink> */}
      <div className='navigation-profile'>
        { username }
        <LogoutButton />
      </div>
    </nav>
  )
}

export default Navigation;
