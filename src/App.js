import Parse from 'parse/dist/parse.min.js';
import { Outlet, Link } from 'react-router-dom';

const PARSE_APPLICATION_ID = 'q4F1zNj3A1adPXkE9NB3OnpOVYHuqRxQb4HRjmqG';
const PARSE_HOST_URL = 'https://parseapi.back4app.com/';
const PARSE_JAVASCRIPT_KEY = '120df40Zs6IUxVQDl9rbmUzIXlnNCYHcEnP3UxIs';
Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;

function App() {
  return (
    <div className='App'>
      <header>
        <nav>
          <Link to='/'>Home</Link>
          <Link to='/destinations'>All Destinations</Link>
          <div id='guest'>
            <Link to='/login'>Login</Link>
            <Link to='/register'>Register</Link>
          </div>
          <div id='profile'>
            <a className='welcomeMsg'>Welcome username</a>
            <Link to='/profile'>My Destinations</Link>
            <Link to='/create'>Add Destinations</Link>
            <a href='javascript:void(0)' className='logoutBtn'>
              Logout
            </a>
          </div>
        </nav>
        <Outlet />
      </header>
    </div>
  );
}

export default App;
