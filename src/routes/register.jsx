import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { getUserData, register } from '../api';

export default function Register(props) {
  const [user, setUser] = useState(getUserData());

  function onClick(e) {
    e.target.parentNode.children[1].focus();
  }

  async function onSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const username = formData.get('username');
    const email = formData.get('email');
    const password = formData.get('password');
    const rePass = formData.get('rePass');
    if (username === '' || email === '' || password === '' || rePass === '') {
      return alert('All fields are required!');
    }
    if (password !== rePass) {
      return alert('Passwords don\'t match!');
    }
    await register(username, email, password);
    setUser(getUserData());
    props.loginCallback();
  }

  return (
    <main className='registerBox'>
      {user && (<Navigate to="/" replace={true} />)}
      <h2>Register</h2>
      <form onSubmit={onSubmit}>
        <div className='register'>
          <label htmlFor='username' onClick={onClick}>
            Username
          </label>
          <input type='text' name='username' />
        </div>
        <div className='register'>
          <label htmlFor='email' onClick={onClick}>
            Email
          </label>
          <input type='email' name='email' />
        </div>
        <div className='register'>
          <label htmlFor='password' onClick={onClick}>
            Password
          </label>
          <input type='password' name='password' />
        </div>
        <div className='register'>
          <label htmlFor='rePass' onClick={onClick}>
            Repeat Password
          </label>
          <input type='password' name='rePass' />
        </div>
        <div className='register'>
          <input type='submit' value='Submit' />
        </div>
      </form>
      <p>
        Already have an account?<Link to='/login'> Log in now</Link>
      </p>
    </main>
  );
}
