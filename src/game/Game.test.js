import React from 'react';
import ReactDOM from 'react-dom';
import Game from './Game';
import { BrowserRouter } from 'react-router-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <Game />
    </BrowserRouter>, 
    div);
  ReactDOM.unmountComponentAtNode(div);
});