import React from "react";
import { NavLink } from "react-router-dom";
import './LandingPage.css';
import './about-links.css';

const LandingPage = () => {
  return (
    <div className='landing-page-container'>
      <div>
        <div className='about-links-container'>
          <a href='https://github.com/boromeot' target='_blank' rel="noreferrer" className='about-links'>
            Github
          </a>
          <a href='https://www.linkedin.com/in/kekoa-boromeo/' target='_blank' rel="noreferrer" className='about-links'>
            Linkedin
          </a>
        </div>
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
    </div>

  )
}

export default LandingPage;
