import React, { useEffect } from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import { Router } from './router/Router';
import './styles.css';

export default function App() {
  useEffect(() => {
    const loggedInUserId = '12345'; // example user ID
    if (window.CommandBar) {
      window.CommandBar.boot(loggedInUserId);
    } else {
      console.error('CommandBar SDK is not loaded');
    }
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Link to="/">HOME</Link>
        <br />
        <Link to="/Page1">Page1</Link>
        <br />
        <Link to="/Page2">Page2</Link>
      </div>
      <Router />
    </BrowserRouter>
  );
}
