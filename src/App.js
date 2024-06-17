import React, { useEffect, useState } from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import { Router } from './router/Router';
import CatRecords from './CatRecords';
import { init } from 'commandbar';
import './styles.css';

const fetchCatFacts = async () => {
  const response = await fetch('https://meowfacts.herokuapp.com/');
  const data = await response.json();
  return data.data[0];
};

const App = () => {
  const [fact, setFact] = useState('');
  const [commandBarLoaded, setCommandBarLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      init('1f4d41c8');
      if (typeof CommandBar !== 'undefined') {
        CommandBar.boot('');
        setCommandBarLoaded(true);
      } else {
        console.error('CommandBar is not available.');
      }
    }
  }, []);  

  useEffect(() => {
    if (commandBarLoaded) {
      const setupCommandBarAction = async () => {
        CommandBar.addCallback('Get Cat Fact', async () => {
          const catFact = await fetchCatFacts();
          setFact(catFact);
        });
      };
  
      setupCommandBarAction();
    }
  }, [commandBarLoaded]);

  return (
    <BrowserRouter>
      <div className="App">
        <Link to="/">HOME</Link>
        <br />
        <Link to="/page1">Page1</Link>
        <br />
        <Link to="/page2">Page2</Link>
        {fact && <p>{fact}</p>}
        {commandBarLoaded && <CatRecords />}
      </div>
      <Router />
    </BrowserRouter>
  );
};

export default App;
