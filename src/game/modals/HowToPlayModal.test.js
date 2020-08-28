import React from 'react';
import ReactDOM from 'react-dom';
import HowToPlayModal from './HowToPlayModal';
import { BrowserRouter } from 'react-router-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <HowToPlayModal />
    </BrowserRouter>, 
    div);
  ReactDOM.unmountComponentAtNode(div);
});