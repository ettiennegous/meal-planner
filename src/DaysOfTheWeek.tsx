import React from 'react';
import * as DBI from './db-interfaces';
import Helpers from './Helpers';


class DaysOfTheWeek extends React.Component {
      
      public Days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

      public render() {
        return (
            <ul>
              {this.Days.map(day => <li>{day}</li>)}
            </ul>);
      }
}    
export default DaysOfTheWeek;
    