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
    } else {
      setErrors(['The two passwords do not match']);
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
    return <Redirect to={`/users/${user.id}/dashboard`} />;
  }

  return (
   <div className='form-container'>
    <div className='form-logo-container' >
      <img src='https://i.imgur.com/PcizS9M.png' alt='wolf logo'/>
    </div>
    <form onSubmit={onSignUp} className='form-card'>
        <h2 className='form-heading'>Sign up</h2>
        <div className='form-error'>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div className='form-input-container'>

          <input
            type='text'
            name='username'
            placeholder='Username'
            onChange={updateUsername}
            value={username}
            className='form-input'
          />
        </div>
          <div className='form-input-container'>
            <input
              type='text'
              name='email'
              placeholder='Email'
              onChange={updateEmail}
              value={email}
              className='form-input'
            />
          </div>
          <div className='form-input-container'>
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24"viewBox="0 0 24 24" style={{fill: '#ffffff'}}><path d="M 12 1 C 8.6761905 1 6 3.6761905 6 7 L 6 8 C 4.9069372 8 4 8.9069372 4 10 L 4 20 C 4 21.093063 4.9069372 22 6 22 L 18 22 C 19.093063 22 20 21.093063 20 20 L 20 10 C 20 8.9069372 19.093063 8 18 8 L 18 7 C 18 3.6761905 15.32381 1 12 1 z M 12 3 C 14.27619 3 16 4.7238095 16 7 L 16 8 L 8 8 L 8 7 C 8 4.7238095 9.7238095 3 12 3 z M 6 10 L 18 10 L 18 20 L 6 20 L 6 10 z M 12 13 C 10.9 13 10 13.9 10 15 C 10 16.1 10.9 17 12 17 C 13.1 17 14 16.1 14 15 C 14 13.9 13.1 13 12 13 z"></path></svg>
            <input
              type='password'
              name='password'
              placeholder='Password'
              onChange={updatePassword}
              value={password}
              className='form-input'
            />
          </div>
          <div className='form-input-container'>
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24"viewBox="0 0 24 24" style={{fill: '#ffffff'}}><path d="M 12 1 C 8.6761905 1 6 3.6761905 6 7 L 6 8 C 4.9069372 8 4 8.9069372 4 10 L 4 20 C 4 21.093063 4.9069372 22 6 22 L 18 22 C 19.093063 22 20 21.093063 20 20 L 20 10 C 20 8.9069372 19.093063 8 18 8 L 18 7 C 18 3.6761905 15.32381 1 12 1 z M 12 3 C 14.27619 3 16 4.7238095 16 7 L 16 8 L 8 8 L 8 7 C 8 4.7238095 9.7238095 3 12 3 z M 6 10 L 18 10 L 18 20 L 6 20 L 6 10 z M 12 13 C 10.9 13 10 13.9 10 15 C 10 16.1 10.9 17 12 17 C 13.1 17 14 16.1 14 15 C 14 13.9 13.1 13 12 13 z"></path></svg>
            <input
              type='password'
              name='repeat_password'
              placeholder='Repeat Password'
              onChange={updateRepeatPassword}
              value={repeatPassword}
              className='form-input'
              required={true}
            />
          </div>
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
