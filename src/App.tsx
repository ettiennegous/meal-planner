import React, { Suspense, Fragment } from 'react';
import logo from './logo.svg';
import './App.css';
import Ingredients from './Ingredients'
import DaysOfTheWeek from './DaysOfTheWeek'
import Recipes from './Recipes'

class App extends React.Component {

  public render() {
    return (
      <div className="App">
        <header className="App-header">
          Meal Planner
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <DaysOfTheWeek />
        <div>
          <div>
            <Ingredients />
          </div>
          <div>
            <Recipes />
          </div>
        </div>

      </div>
    );
  }
}

export default App;
