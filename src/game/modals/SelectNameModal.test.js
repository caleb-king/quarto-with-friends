import React from 'react';
import ReactDOM from 'react-dom';
import SelectNameModal from './SelectNameModal';
import { BrowserRouter } from 'react-router-dom';
import * as testData from '../../testData';

const { guest, host } = testData;

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <SelectNameModal 
        guest={guest}
        host={host}
      />
    </BrowserRouter>, 
    div);
  ReactDOM.unmountComponentAtNode(div);
});