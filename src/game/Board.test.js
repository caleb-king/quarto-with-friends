import React from 'react';
import ReactDOM from 'react-dom';
import Board from './Board';
import { BrowserRouter } from 'react-router-dom';
import * as testData from '../testData';

const { boardArr, lastPlaced, winner, activeBoard } = testData;

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <Board 
        boardArr={boardArr}
        lastPlaced={lastPlaced}
        winner={winner}
        activeBoard={activeBoard}
      />
    </BrowserRouter>, 
    div);
  ReactDOM.unmountComponentAtNode(div);
});