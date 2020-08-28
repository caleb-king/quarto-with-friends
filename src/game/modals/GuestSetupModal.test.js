import React from 'react';
import ReactDOM from 'react-dom';
import GuestSetupModal from './GuestSetupModal';
import { BrowserRouter } from 'react-router-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <GuestSetupModal />
    </BrowserRouter>, 
    div);
  ReactDOM.unmountComponentAtNode(div);
});