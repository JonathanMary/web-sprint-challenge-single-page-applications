import React from "react";
import { NavLink, Switch, Route } from 'react-router-dom'
import Homepage from './Homepage'
import Pizza from './Pizza'
import Confirmation from './Confirmation'


const App = () => {
  return (
    <>
      <div className='container'>
        <header className='header'>
          <h1>Lambda Eats</h1>
          <nav>
            <NavLink to='/' className='nav-buttons'>Home</NavLink>
            <NavLink to={"PUT SOMETHING"} className='nav-buttons'>Help</NavLink>
          </nav>
        </header>

        <Switch>
          <Route path='/confirmation'>
            <Confirmation />
          </Route>
          <Route path='/pizza'>
            <Pizza />
          </Route>
          <Route path='/'>
            <Homepage />
          </Route>
        </Switch>
      </div>

    </>
  );
};
export default App;
