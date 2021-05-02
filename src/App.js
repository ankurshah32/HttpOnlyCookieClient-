import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Dashboard from './components/dashboard';
import Preferences from './components/preference';
import Login from './components/login';

function getCook(cookiename) 
{
  // Get name followed by anything except a semicolon
  var cookiestring=RegExp(cookiename+"=[^;]+").exec(document.cookie);
  // Return everything after the equal sign, or an empty string if the cookie name not found
  return decodeURIComponent(!!cookiestring ? cookiestring.toString().replace(/^[^=]+./,"") : "");
}

function setToken(userToken) {
  sessionStorage.setItem('token', JSON.stringify(userToken));
}

function getToken() {
  return getCook('access');
}

function App() {
  const token = getCook('loggedIn');

  if(!token) {
    return <Login setToken={setToken} />
  }
  return (
    <div className="App">
      <h1>Application</h1>
      <ul>
        <li><a href="/dashboard">Dashboard</a></li>
        <li><a href="/preferences">Preferences</a></li>
        <li><a href="http://localhost:1525/logout">Logout</a></li>
      </ul>
      <BrowserRouter>
        <Switch>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/preferences">
            <Preferences />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
