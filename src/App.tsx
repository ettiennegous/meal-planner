import React, { Suspense, Fragment } from 'react';
import logo from './logo.svg';
import './App.css';
import Ingredients from './Ingredients'
import DaysOfTheWeek from './DaysOfTheWeek'
import Recipes from './Recipes'
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {

  public render() {
    return (
      <div className="App">
        <DndProvider backend={HTML5Backend}>
          {/* <Ingredients /> */}
          <Recipes />
          <DaysOfTheWeek />
        </DndProvider>
      </div>
    );
  }
}

export default App;
