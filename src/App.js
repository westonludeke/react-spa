import React, { useEffect } from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import { Router } from './router/Router';
import { init } from "commandbar";
import './styles.css';

if (typeof window !== "undefined") {
  init("1f4d41c8");
}

export default () => {
  useEffect(() => {
		// Here we are passing in an empty string as the userId and no userAttributes param. 
		// In a real application you would want to include these so you can tag
		// analytics events and for end-user personalization.
    window.CommandBar.boot("");

    return () => {
      window.CommandBar.shutdown();
    };
  }, []);

  return null;
};

//   return (
//     <BrowserRouter>
//       <div className="App">
//         <Link to="/">HOME</Link>
//         <br />
//         <Link to="/Page1">Page1</Link>
//         <br />
//         <Link to="/Page2">Page2</Link>
//       </div>
//       <Router />
//     </BrowserRouter>
//   );
// }
