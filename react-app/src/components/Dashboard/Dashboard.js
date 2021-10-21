import React from 'react';
import { NavLink, Route, useParams, useRouteMatch } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const { userId } = useParams();
  const { path, url } = useRouteMatch();

  return (
    <div className='dashboard-container'>
      <div className='dashboard-panel'>
        <div className='dashboard-logo-container'>
          <a href={`/users/${userId}/dashboard`}>
            <img className='dashboard-logo' src='https://i.imgur.com/awqVsCJ.png' alt='' />
          </a>
        </div>
        <div className='dashboard-link-container'>
          <NavLink to={`${url}/exercise`} className='dashboard-link' activeClassName='active'>
            Exercise
          </NavLink>
          <NavLink to={`${url}/diet`} className='dashboard-link'>
            Diet
          </NavLink>
          <NavLink to={`${url}/progress`} className='dashboard-link'>
            Progress
          </NavLink>
        </div>
      </div>
      <div>
        <Route path={`${path}`} exact>
          welcome
        </Route>
        <Route path={`${path}/exercise`} >
          exercise
        </Route>
        <Route path={`${path}/diet`} >
          diet
        </Route>
        <Route path={`${path}/progress`} >
          progress
        </Route>
      </div>
    </div>
  )
};

export default Dashboard;
