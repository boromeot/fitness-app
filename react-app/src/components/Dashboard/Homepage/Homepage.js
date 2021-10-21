import React from "react";
import { useSelector } from 'react-redux';
import './Homepage.css';

const Homepage = () => {
  const { username } = useSelector(state => state.session.user);
  return (
    <div className='homepage-container'>
      <h1 className='homepage-heading'>Welcome back</h1>
      <h2 className='homepage-subheading'>{ username }</h2>
    </div>
  )
}

export default Homepage;
