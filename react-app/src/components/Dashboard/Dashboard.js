import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink, Route, useParams, useRouteMatch } from 'react-router-dom';
import './Dashboard.css';
import './Homepage.css';

const Dashboard = () => {
  const { userId } = useParams();
  const { path, url } = useRouteMatch();
  const { username } = useSelector(state => state.session.user);

  return (
    <div className='dashboard-container'>
      <div className='dashboard-panel'>
        <div className='dashboard-logo-container'>
          <NavLink to={`/users/${userId}/dashboard`} activeClassName=''>
            <img className='dashboard-logo' src='https://i.imgur.com/awqVsCJ.png' alt=''/>
          </NavLink>
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
      <div className='dashboard-content-container'>
        <Route path={`${path}`} exact>
          <div className='homepage-container'>
           <h1 className='homepage-heading'>Welcome back</h1>
           <h2 className='homepage-subheading'>{ username }</h2>
          </div>
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
