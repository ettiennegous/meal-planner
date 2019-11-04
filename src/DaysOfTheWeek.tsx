import React from 'react';
import { useDrop } from 'react-dnd'
import * as DBI from './db-interfaces';
import Helpers from './Helpers';
import ItemTypes from './ItemTypes'
import Dustbin from './Dustbin';

interface Props {
  canDrop: boolean;
  isOver: boolean;
}

class DaysOfTheWeek extends React.Component<{},Props>   {

  public Days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  public render() {
    return (
      <>
        {this.Days.map(day => <Dustbin name={day}/>)}
      </>
      );
  }
}
export default DaysOfTheWeek;