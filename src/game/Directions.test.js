import React from 'react';
import ReactDOM from 'react-dom';
import Directions from './Directions';
import { BrowserRouter } from 'react-router-dom';
import * as testData from '../testData';

const { directionString, myTurn, phase } = testData;

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <Directions 
        directionString={directionString}
        myTurn={myTurn}
        phase={phase}
      />
    </BrowserRouter>, 
    div);
  ReactDOM.unmountComponentAtNode(div);
});