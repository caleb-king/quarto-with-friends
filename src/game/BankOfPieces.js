import React from 'react';
import { pieceAttributes } from '../STORE';
import { useParams } from 'react-router-dom';
import { API_ENDPOINT } from '../config';

function BankOfPieces(props) {
  const { 
    initialBankOfPiecesArr, 
    placedPieces, 
    selectedPiece,
    activeBank,
    handleAddSelection 
  } = props;
  const gameId = useParams().gameId;

  function selectPiece(e) {
    if (!activeBank) return;
    const piece = e.currentTarget.dataset.id;

    const newMove = {
      moveType: 'selection',
      value: piece,
    }
    fetch(`${API_ENDPOINT}/games/${gameId}/moves`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newMove),
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e));
        return res.json();
      })
      .then(move => {
        handleAddSelection(move.value)
      })
      .catch(error => {
        console.error({ error });
      });
  }

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
      if (activeBank) {
        liClass += ' pointer';
      }

      return (
        <li className={liClass} key={i}>
          <img 
            className="bankPieceImg"
            onClick={selectPiece}
            data-id={initialPiece}
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
