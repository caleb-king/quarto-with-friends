import React from 'react';
import BankOfPieces from './BankOfPieces';
import Board from './Board';
import Directions from './Directions';
import GuestSetupModal from './modals/GuestSetupModal';
import HowToPlayModal from './modals/HowToPlayModal';
import SelectNameModal from './modals/SelectNameModal';
import EndGameMessage from './end-game/EndGameMessage';

function Game() {
  return (
    <>
      <h1>Game</h1>
      <ul>
        <li><Board /></li>
        <li><BankOfPieces /></li>
        <li><Directions /></li>
      </ul>
      <h2>Modals</h2>
        <ul>
          <li><GuestSetupModal /></li>
          <li><HowToPlayModal /></li>
          <li><SelectNameModal /></li>
        </ul>
      <h2>Endgame</h2>
      <ul>
        <li><EndGameMessage /></li>
      </ul>
    </>
  );
}

export default Game;
