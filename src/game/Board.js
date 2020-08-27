import React from 'react';
import { pieceAttributes } from '../STORE';

function Board(props) {
  const { boardArr, lastPlaced, winner } = props;

  function renderBoard(boardArr) {
    return boardArr.map((cell, i) => {
      if (cell === null) {
        return <li className="cell" key={i}></li>;
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
