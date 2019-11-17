import React from 'react';
import {useLocation, BrowserRouter as Router} from 'react-router-dom';
import logo from './static/circle-icon-profile.svg';
import './styles/reset.css';
import './styles/debug.css';
import './styles/debug-ie7.css';
import './App.css';

import AppRouter from './AppRouter';

const AppHeader: React.FC = () => {
  const location = useLocation();

  const pathname = location.pathname;
  let title = '';

  if (pathname === '/' || pathname === '/list-users') {
    title = 'Users list';
  } else if (pathname === '/new-user') {
    title = 'User register';
  } else {
    title = 'User update';
  }

  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" title={title} />
      <h1 className="page-title">{title}</h1>
    </header>
  );
};

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
      <AppHeader/>
      <div id="content">
        <AppRouter/>
      </div>
      </Router>
    </div>
  );
};

export default App;
