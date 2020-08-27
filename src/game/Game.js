import React, { useRef, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BankOfPieces from './BankOfPieces';
import Board from './Board';
import Directions from './Directions';
import GuestSetupModal from './modals/GuestSetupModal';
import HowToPlayModal from './modals/HowToPlayModal';
import SelectNameModal from './modals/SelectNameModal';
import EndGameMessage from './end-game/EndGameMessage';
import { API_ENDPOINT } from '../config';
import * as helpers from '../helper';
import * as STORE from '../STORE';

function Game(props) {  
  const { currPlayer, setCurrPlayer } = props;
  const gameId = useParams().gameId;
  const initialBankOfPiecesArr = useRef(helpers.getRandomizedBankOfPiecesArr());

  // STATE
  const [showHowTo, setShowHowTo] = useState(false);
  const [host, setHost] = useState(null);
  const [guest, setGuest] = useState(null);
  const [movesArr, setMovesArr] = useState([]);
  
  useEffect(() => {
    Promise.all([
      fetch(`${API_ENDPOINT}/games/${gameId}`),
      fetch(`${API_ENDPOINT}/games/${gameId}/moves`)
    ])
      .then(([gamesRes, movesRes]) => {
        if (!gamesRes.ok)
          return gamesRes.json().then(e => Promise.reject(e))
        if (!movesRes.ok)
          return movesRes.json().then(e => Promise.reject(e));

        return Promise.all([
          gamesRes.json(),
          movesRes.json(),
        ])
      })
      .then(([gameData, moves]) => {
        setHost(gameData.host);
        setGuest(gameData.guest);
        const processedMoves = helpers.createMovesArr(moves)
        setMovesArr(processedMoves);
      })
      .catch(error => {
        console.error({ error });
      })
  }, [gameId]);

  console.log('host: ', host);
  console.log('guest: ', guest);
  console.log('movesArr: ', movesArr);

  const turn = helpers.whosTurn(movesArr, guest, host);
  const phase = helpers.getPhase(movesArr);
  const selectedPiece = helpers.getSelectedPiece(movesArr);
  const lastPlaced = helpers.getLastPlaced(movesArr);
  const boardArr = helpers.deriveBoardArr(movesArr);
  const placedPieces = helpers.derivePlacedPieces(movesArr);
  const directionString = helpers.createDirectionString(turn, phase, currPlayer, guest);
  
  const winner = { isCurrPlayer: null, line: null };
  winner.line = helpers.checkForWinningLine(boardArr, STORE.lines, STORE.pieceAttributes);
  if (winner.line !== null) {
    winner.isCurrPlayer = turn === currPlayer;
  }

  const isWinner = winner.isCurrPlayer !== null;
  const renderGuestSetupModal = !currPlayer && !guest;
  const renderSelectName = 
    !currPlayer && host && guest;
  
  return (
    <>
      <header>
        <img className="logo" src="/images/quarto-logo.png" alt="Quarto Logo"/>
        <h1>Quarto With Friends</h1>
      </header>
      <main>
        <Board 
          boardArr={boardArr}
          lastPlaced={lastPlaced}
          winner={winner}
        />
        {renderGuestSetupModal && 
          <GuestSetupModal 
            setCurrPlayer={setCurrPlayer}
            setShowHowTo={setShowHowTo}
            setGuest={setGuest}
          />
        }
        {renderSelectName && 
          <SelectNameModal 
            guest={guest}
            host={host}
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
              initialBankOfPiecesArr={initialBankOfPiecesArr}
              placedPieces={placedPieces}
              selectedPiece={selectedPiece}
            />
            <Directions 
              directionString={directionString}
              myTurn={turn === currPlayer}
              phase={phase}
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
