import React from 'react';
import ReactDOM from 'react-dom';
import BankOfPieces from './BankOfPieces';
import { BrowserRouter } from 'react-router-dom';
import * as testData from '../testData';

const { initialBankOfPiecesArr, placedPieces, selectedPiece, activeBank } = testData;

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <BankOfPieces 
        initialBankOfPiecesArr={initialBankOfPiecesArr}
        placedPieces={placedPieces}
        selectedPiece={selectedPiece}
        activeBank={activeBank}
      />
    </BrowserRouter>, 
    div);
  ReactDOM.unmountComponentAtNode(div);
});