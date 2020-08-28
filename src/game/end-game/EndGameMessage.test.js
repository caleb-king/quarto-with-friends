import React from 'react';
import ReactDOM from 'react-dom';
import EndGameMessage from './EndGameMessage';
import { BrowserRouter } from 'react-router-dom';
import * as testData from '../../testData';

const { isCurrPlayer, draw } = testData;

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <EndGameMessage 
        isCurrPlayer={isCurrPlayer}
        draw={draw}
      />
    </BrowserRouter>, 
    div);
  ReactDOM.unmountComponentAtNode(div);
});