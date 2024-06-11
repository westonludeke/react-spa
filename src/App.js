import React, { useEffect } from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import { Router } from './router/Router';
import { init } from 'commandbar';
import './styles.css';

if (typeof window !== 'undefined') {
  init('1f4d41c8');
}

const App = () => {
  useEffect(() => {
    window.CommandBar.boot('');

    return () => {
      window.CommandBar.shutdown();
    };
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
};

export default App;
