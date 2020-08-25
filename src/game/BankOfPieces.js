import React from 'react';
import { pieceAttributes } from '../STORE';

function BankOfPieces(props) {
  const { 
    initialBankOfPiecesArr, 
    placedPieces, 
    selectedPiece 
  } = props;

  function renderBank(initialBank, placed, selected) {
    return initialBank.map((initialPiece, i) => {
      let liClass = pieceAttributes[initialPiece][1] === 0 ?
        'largeBankPiece':
        'smallBankPiece';

      if (placed.includes(initialPiece)) {
        liClass += ' hidden';
      }
      if (initialPiece === selected) {
        liClass += ' selected-piece';
      }

      return (
        <li className={liClass} key={i}>
          <img 
            className="bankPieceImg"
            src={`/images/pieces/P${initialPiece}.png`}
            alt={`remaining piece in bank: ${pieceAttributes[initialPiece]}`} 
          />
        </li>
      )
    });
  }

  const bankOutput = renderBank(
    initialBankOfPiecesArr.current,
    placedPieces,
    selectedPiece
  );
  
  return (
    <div className="bank-container">
      <ul className="bank">
        {bankOutput}
      </ul>
    </div>
  );
}

export default BankOfPieces;
