import React from "react";
import { NavLink } from "react-router-dom";
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className='landing-page-container'>
      <section className='landing-page-section' id='landing-page-header'>
        <div className='landing-page-heading-container'>
          <h1 className='landing-page-heading'>TITLE</h1>
          <h2 className='landing-page-subheading'>Be an inspiration.</h2>
          <NavLink className='landing-page-main-btn' to='/login' >Explore</NavLink>
        </div>
      </section>
      <section className='landing-page-section'>

      </section>
    </div>

  )
}

export default LandingPage;
