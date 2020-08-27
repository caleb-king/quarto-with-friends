import React from 'react';
import { pieceAttributes } from '../STORE';
import { useParams } from 'react-router-dom';
import { API_ENDPOINT } from '../config';

function Board(props) {
  const { boardArr, lastPlaced, winner, activeBoard, handleAddPlacement } = props;
  const gameId = useParams().gameId;

  function placePiece(e) {
    if (!activeBoard) return;
    const location = e.currentTarget.dataset.id;

    const newMove = {
      moveType: 'placement',
      value: location,
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
        handleAddPlacement(move.value)
      })
      .catch(error => {
        console.error({ error });
      });
  }

  function renderBoard(boardArr) {
    return boardArr.map((cell, i) => {
      if (cell === null) {
        let liClass = !activeBoard ? 'cell' : 'cell pointer' 
        return <li className={liClass} key={i} data-id={i} onClick={placePiece}></li>;
      }
      let liClass = 'cell';
      if (i === lastPlaced) {
        liClass += ' last-placed';
      }
      
      const boardPieceClass = pieceAttributes[cell][1] === 0 ?
        'boardPieceLarge':
        'boardPieceSmall';
      return (
        <li className={liClass} key={i}>
          <img 
            className={boardPieceClass}
            src={`/images/pieces/P${cell}.png`}
            alt={`Piece placed on board: ${pieceAttributes[cell]}`} 
          />
        </li>
      );
    })
  }

  function renderWinningBoard(boardArr, isCurrPlayer, line) {
    const highlightClass = isCurrPlayer === true ?
      'winning-cell':
      'losing-cell';
    return boardArr.map((cell, i) => {
      if (cell === null) {
        return <li className="cell" key={i}></li>;
      }
      const boardPieceClass = pieceAttributes[cell][1] === 0 ?
        'boardPieceLarge':
        'boardPieceSmall';

      if (line.includes(i)) {
        return (
          <li className={`cell ${highlightClass}`} key={i}>
            <img 
              className={boardPieceClass}
              src={`/images/pieces/P${cell}.png`}
              alt={`Piece placed on board: ${pieceAttributes[cell]}`} 
            />
          </li>
        )
      }
      return (
        <li className="cell" key={i}>
          <img 
            className={boardPieceClass}
            src={`/images/pieces/P${cell}.png`}
            alt={`Piece placed on board: ${pieceAttributes[cell]}`} 
          />
        </li>
      );
    })
  }

  const boardOutput = winner.isCurrPlayer === null ?
    renderBoard(boardArr) :
    renderWinningBoard(boardArr, winner.isCurrPlayer, winner.line);
  
  return (
    <div className="board-container">
      <ul className="board">
        {boardOutput}
      </ul>
    </div>
  );
}

export default Board;
