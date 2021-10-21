import React from 'react';
import { NavLink } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div>
      <div className='dashboard-panel'>
        <div className='dashboard-logo-container'>
          <img className='dashboard-logo' src='https://i.imgur.com/awqVsCJ.png' alt='' />
        </div>
        <div className='dashboard-link-container'>
          <NavLink to='/users/1/dashboard/exercise' className='dashboard-link' activeClassName='active'>
            Exercise
          </NavLink>
          <NavLink to='/users/1/dashboard/ggg' className='dashboard-link'>
            Diet
          </NavLink>
          <NavLink to='/users/1/dashboard/hhh' className='dashboard-link'>
            Progress
          </NavLink>
        </div>
      </div>
    </div>
  )
};

export default Dashboard;
