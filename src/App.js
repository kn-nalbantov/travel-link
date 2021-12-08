import logo from './logo.svg';
import './App.css';
import Parse from 'parse/dist/parse.min.js';

const PARSE_APPLICATION_ID = 'q4F1zNj3A1adPXkE9NB3OnpOVYHuqRxQb4HRjmqG';
const PARSE_HOST_URL = 'https://parseapi.back4app.com/';
const PARSE_JAVASCRIPT_KEY = '120df40Zs6IUxVQDl9rbmUzIXlnNCYHcEnP3UxIs';
Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
