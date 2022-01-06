import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { getUserData, login } from '../api';

export default function Login(props) {
  const [user, setUser] = useState(getUserData());
  const [validate, setValidate] = useState();

  function onClick(e) {
    e.target.parentNode.children[1].focus();
  }

  async function onSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');

    const el = document.createElement('span');
    el.textContent = 'invalid';
    el.style = 'color:red';
    const el2 = document.createElement('span');
    el2.textContent = 'invalid';
    el2.style = 'color:red';

    if (email === '') {
      e.target.children[0].appendChild(el);
    }
    if (password === '') {
      e.target.children[1].appendChild(el2);
    }
    try {
      e.target.children[2].children[0].disabled = true;
      await login(email, password);
      setUser(getUserData());
      props.loginCallback();
    } catch (err) {
      // console.log(err);
    } finally {
      e.target.children[2].children[0].disabled = false;
    }
  }

  function onChange(e) {
    setValidate(e.target.value);
  }

  return (
    <main>
      <div className='registerBox'>
        {user && <Navigate to='/' replace={true} />}
        <h2>Login</h2>
        <form onSubmit={onSubmit}>
          <div className='register'>
            <label htmlFor='email' onClick={onClick}>
              Email
            </label>
            <input type='email' name='email' value={validate} onChange={onChange} />
          </div>
          <div className='register'>
            <label htmlFor='password' onClick={onClick}>
              Password
            </label>
            <input type='password' name='password' />
          </div>
          <div className='register'>
            <input type='submit' value='Submit' />
          </div>
        </form>
        <p>
          Don't have an account?<Link to='/register'> Sign up now</Link>
        </p>
      </div>
    </main>
  );
}
