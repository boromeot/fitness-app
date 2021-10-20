import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import '../../stylesheets/forms.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
   <div className='form-container'>
      <form onSubmit={onSignUp} className='form-card'>
        <h2 className='form-heading'>Sign up</h2>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
          <input
            type='text'
            name='username'
            placeholder='Username'
            onChange={updateUsername}
            value={username}
            className='form-input'
          ></input>
          <input
            type='text'
            name='email'
            placeholder='Email'
            onChange={updateEmail}
            value={email}
            className='form-input'
          ></input>
          <input
            type='password'
            name='password'
            placeholder='Password'
            onChange={updatePassword}
            value={password}
            className='form-input'
          ></input>
          <input
            type='password'
            name='repeat_password'
            placeholder='Repeat Password'
            onChange={updateRepeatPassword}
            value={repeatPassword}
            className='form-input'
            required={true}
          ></input>
        <button type='submit' className='form-login-btn'>Sign Up</button>
        <div className='form-toggle'>
            New here?&nbsp;
            <NavLink to='/login' >Log in</NavLink>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
