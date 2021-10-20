import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import '../../stylesheets/forms.css';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='form-container'>
      <form onSubmit={onLogin} className='form-card'>
          <h2 className='form-heading'>Log in</h2>
          <input
            name='email'
            type='text'
            placeholder='Email'
            value={email}
            onChange={updateEmail}
            className='form-input'
          />
          {
            errors[0] &&
            <div className='form-error'>{errors[0]}</div>
          }
          <input
            name='password'
            type='password'
            placeholder='Password'
            value={password}
            onChange={updatePassword}
            className='form-input'
          />
          {
            errors[1] &&
            <div className='form-error'>{errors[1]}</div>
          }
        <button type='submit' className='form-login-btn'>Login</button>
        <div className='form-toggle'>
            New here?&nbsp;
            <NavLink to='/sign-up' >Sign up</NavLink>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
