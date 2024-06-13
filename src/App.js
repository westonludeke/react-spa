import React, { useEffect, useState } from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import { Router } from './router/Router';
import { init } from 'commandbar';
import './styles.css';

const fetchCatFacts = async () => {
  try {
    console.log('Fetching cat facts...');
    const response = await fetch('https://meowfacts.herokuapp.com/');
    console.log('Response:', response);
    const data = await response.json();
    console.log('Data:', data);
    return data.data[0];
  } catch (error) {
    console.error('Error fetching cat facts:', error);
  }
};

const App = () => {
  const [fact, setFact] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      console.log('Initializing CommandBar');
      init('1f4d41c8');
      console.log('CommandBar instance:', CommandBar);
  
      if (typeof CommandBar !== 'undefined') {
        console.log('Booting CommandBar');
        CommandBar.boot('');
  
        const setupCommandBarAction = async () => {
          console.log('Setting up CommandBar action');
          CommandBar.addCallback('Get Cat Fact', async () => {
            console.log('CommandBar action triggered');
            const catFact = await fetchCatFacts();
            console.log('Cat Fact:', catFact);
            setFact(catFact);
            console.log('State updated with new fact');
          });
          console.log('Callback added');
        };
  
        setupCommandBarAction();
  
        return () => {
          console.log('Shutting down CommandBar');
          CommandBar.shutdown();
        };
      } else {
        console.error('CommandBar is not available.');
      }
    }
  }, []);  

  return (
    <BrowserRouter>
      <div className="App">
        <Link to="/">HOME</Link>
        <br />
        <Link to="/page1">Page1</Link>
        <br />
        <Link to="/page2">Page2</Link>
        {fact && <p>{fact}</p>}
      </div>
      <Router />
    </BrowserRouter>
  );
};

export default App;
