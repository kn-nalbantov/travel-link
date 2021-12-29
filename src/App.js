import Parse from 'parse/dist/parse.min.js';
import { Routes, Route, Link } from 'react-router-dom';
import Destinations from './routes/destinations';
import Profile from './routes/Profile';
import Create from './routes/Create';
import Home from './routes/Home';
import * as api from './api.js';
import { getDestinations } from './data.js';
import Login from './routes/login';
import Register from './routes/register';
import { useState } from 'react';

const PARSE_APPLICATION_ID = 'q4F1zNj3A1adPXkE9NB3OnpOVYHuqRxQb4HRjmqG';
const PARSE_HOST_URL = 'https://parseapi.back4app.com/';
const PARSE_JAVASCRIPT_KEY = '120df40Zs6IUxVQDl9rbmUzIXlnNCYHcEnP3UxIs';
Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;

/* DEBUG */
window.api = api;
window.Parse = Parse;
window.getDestinations = getDestinations;

function App() {
  const [user, setUser] = useState(api.getUserData());

  function loginCallback() {
    setUser(api.getUserData());
  }

  function logout(e) {
    e.preventDefault();
    console.log('logged out');
  }

  return (
    <div className='App'>
      <header>
        <nav>
          <Link to='/'>Home</Link>
          <Link to='/destinations'>All Destinations</Link>
          {!user ? (
            <div id='guest'>
              <Link to='/login'>Login</Link>
              <Link to='/register'>Register</Link>
            </div>
          ) : (
            <div id='profile'>
              <span className='welcomeMsg'>Welcome, {user.username}</span>
              <Link to='/profile'>My Destinations</Link>
              <Link to='/create'>Add Destinations</Link>
              <span className='logoutBtn' onClick={logout}>
                Logout
              </span>
            </div>
          )}
        </nav>
      </header>
      <>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/destinations' element={<Destinations />} />
          <Route path='/login' element={<Login loginCallback={loginCallback} />} />
          <Route path='/register' element={<Register loginCallback={loginCallback} />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/create' element={<Create />} />
        </Routes>
      </>
      <footer>All rights reserved &copy;</footer>
    </div>
  );
}

export default App;
