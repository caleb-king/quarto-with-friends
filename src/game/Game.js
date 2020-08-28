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
import * as STORE from '../STORE';
import * as helpers from '../helper';
const { useInterval } = helpers;

function Game(props) {  
  const { currPlayer, setCurrPlayer } = props;
  const gameId = useParams().gameId;
  const initialBankOfPiecesArr = useRef(helpers.getRandomizedBankOfPiecesArr());

  // STATE
  const [showHowTo, setShowHowTo] = useState(false);
  const [host, setHost] = useState(null);
  const [guest, setGuest] = useState(null);
  const [movesArr, setMovesArr] = useState([]);
  
  // Initial fetching of host, guest, and moves from API
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

  // Derive helpful current game values from movesArr, guest, host
  const turn = helpers.whosTurn(movesArr, guest, host);
  const phase = helpers.getPhase(movesArr);
  const selectedPiece = helpers.getSelectedPiece(movesArr);
  const lastPlaced = helpers.getLastPlaced(movesArr);
  const boardArr = helpers.deriveBoardArr(movesArr);
  const placedPieces = helpers.derivePlacedPieces(movesArr);
  const directionString = helpers.createDirectionString(turn, phase, currPlayer, guest);

  // Check for winner
  const winner = { isCurrPlayer: null, line: null };
  winner.line = helpers.checkForWinningLine(boardArr, STORE.lines, STORE.pieceAttributes);
  if (winner.line !== null) {
    winner.isCurrPlayer = turn === currPlayer;
  }

  // Check for draw
  const draw = (movesArr.length === 17) && (winner.line === null);

  // Calculate variable values used for conditional rendering
  const displayEndGame = winner.isCurrPlayer !== null || draw;
  const renderGuestSetupModal = !currPlayer && !guest;
  const renderSelectName = 
    !currPlayer && host && guest;
  
  // Determine whether long polling is needed
  const timeBetweenPolls = helpers.getTimeBetweenPolls(currPlayer, turn, guest);

  // Poll the API for updates every 5 seconds unless timeBetweenPolls is null
  useInterval(() => {
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
  }, timeBetweenPolls);

  function handleAddPlacement(placementValue) {
    const newMove = { placement: placementValue, selection: null };
    setMovesArr(movesArr => [...movesArr, newMove]);
  }

  function handleAddSelection(selectionValue) {
    if (movesArr.length === 0) {
      const newMove = { placement: null, selection: selectionValue };
      setMovesArr(movesArr => [...movesArr, newMove]);
      return;
    }
    const lastMove = movesArr.length - 1;
    // 1. Make a shallow copy of the items
    let moves = [...movesArr];
    // 2. Make a shallow copy of the item you want to mutate
    let move = {...movesArr[lastMove]};
    // 3. Replace the property you're intested in
    move.selection = selectionValue;
    // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
    moves[lastMove] = move;
    // 5. Set the state to our new copy
    setMovesArr(moves);
  }

  function handleReset() {
    setMovesArr([]);
  }
  
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
          activeBoard={turn === currPlayer && phase === 'placement'}
          handleAddPlacement={handleAddPlacement}
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
        {!displayEndGame && 
          <>
            <BankOfPieces
              initialBankOfPiecesArr={initialBankOfPiecesArr}
              placedPieces={placedPieces}
              selectedPiece={selectedPiece}
              activeBank={turn === currPlayer && phase === 'selection'}
              handleAddSelection={handleAddSelection}
            />
            <Directions 
              directionString={directionString}
              myTurn={turn === currPlayer}
              phase={phase}
            />
          </>
        }
        {displayEndGame &&
          <EndGameMessage 
            isCurrPlayer={winner.isCurrPlayer}
            handleReset={handleReset}
            draw={draw}
          />
        }
      </main>
    </>
  );
}

export default Game;
