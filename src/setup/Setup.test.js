import React from 'react';
import ReactDOM from 'react-dom';
import Setup from './Setup';
import { BrowserRouter } from 'react-router-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <Setup />
    </BrowserRouter>, 
    div);
  ReactDOM.unmountComponentAtNode(div);
});