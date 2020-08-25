import React, { useRef, useState } from 'react';
import BankOfPieces from './BankOfPieces';
import Board from './Board';
import Directions from './Directions';
import GuestSetupModal from './modals/GuestSetupModal';
import HowToPlayModal from './modals/HowToPlayModal';
import SelectNameModal from './modals/SelectNameModal';
import EndGameMessage from './end-game/EndGameMessage';
import * as helpers from '../helper';
import * as STORE from '../STORE';

function Game(props) {  
  const { currPlayer, setCurrPlayer } = props
  const InitialBankOfPiecesArr = useRef(helpers.getRandomizedBankOfPiecesArr());
  const [showHowTo, setShowHowTo] = useState(false);
  
  const turn = helpers.whosTurn(STORE.movesArr, STORE.guest, STORE.host);
  const phase = helpers.getPhase(STORE.movesArr);
  const selectedPiece = helpers.getSelectedPiece(STORE.movesArr);
  const boardArr = helpers.deriveBoardArr(STORE.movesArr);
  const placedPieces = helpers.derivePlacedPieces(STORE.movesArr);
  const directionString = helpers.createDirectionString(turn, phase, currPlayer, STORE.guest);
  
  const winner = { isCurrPlayer: null, line: null };
  winner.line = helpers.checkForWinningLine(boardArr, STORE.lines, STORE.pieceAttributes);
  if (winner.line !== null) {
    winner.isCurrPlayer = turn === currPlayer;
  }

  const isWinner = winner.isCurrPlayer !== null;
  const renderGuestSetupModal = !currPlayer && !STORE.guest;
  const renderSelectName = 
    !currPlayer && STORE.host && STORE.guest;
  
  return (
    <>
      <header>
        <img className="logo" src="/images/quarto-logo.png" alt="Quarto Logo"/>
        <h1>Quarto With Friends</h1>
      </header>
      <main>
        <Board 
          boardArr={boardArr}
          winner={winner}
        />
        {renderGuestSetupModal && 
          <GuestSetupModal 
            setCurrPlayer={setCurrPlayer}
            setShowHowTo={setShowHowTo}
          />
        }
        {renderSelectName && 
          <SelectNameModal 
            guest={STORE.guest}
            host={STORE.host}
            setCurrPlayer={setCurrPlayer}
          />
        }
        {
          showHowTo && 
            <HowToPlayModal 
              setShowHowTo={setShowHowTo}
            />
        }
        {!isWinner && 
          <>
            <BankOfPieces
              InitialBankOfPiecesArr={InitialBankOfPiecesArr}
              placedPieces={placedPieces}
              selectedPiece={selectedPiece}
            />
            <Directions 
              directionString={directionString}
            />
          </>
        }
        {isWinner &&
          <EndGameMessage 
            isCurrPlayer={winner.isCurrPlayer}
          />
        }
      </main>
    </>
  );
}

export default Game;
