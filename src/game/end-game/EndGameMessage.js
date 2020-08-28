import React from 'react';
import { useParams } from 'react-router-dom';
import { API_ENDPOINT } from '../../config';

function EndGameMessage(props) {
  const { isCurrPlayer, handleReset, draw } = props;
  const gameId = useParams().gameId;

  function resetGame() {
    fetch(`${API_ENDPOINT}/games/${gameId}/moves`, {
      method: 'DELETE',
      })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e));
      })
      .then(() => {
        handleReset();
      })
      .catch(error => {
        console.error({ error });
      });
  }
  
  function renderWinningMessage() {
    return (
      <>
        <h2 className="winning-words">CONGRATS, YOU'VE WON!</h2>
        <img 
          className="winning-gif"
          src="/images/winning-clip.gif"
          alt="Fun celebratory dance"
        />
        <div className="button-container">
          <button className="button" type="button" onClick={resetGame}>
            PLAY AGAIN
          </button>
        </div>
      </>
    );
  }

  function renderLosingMessage() {
    return (
      <>
        <h2 className="losing-words">Sorry, you've lost. Next time!</h2>
        <img 
          className="losing-gif"
          src="/images/losing-clip.gif"
          alt="Sad neon crying woman"
        />
        <div className="button-container">
          <button className="button" type="button" onClick={resetGame}>
            PLAY AGAIN
          </button>
        </div>
      </>
    );
  }

  function renderDraw() {
    return (
      <>
        <h2 className="losing-words">DRAW! Nice defense.</h2>
        <div className="button-container">
          <button className="button" type="button" onClick={resetGame}>
            PLAY AGAIN
          </button>
        </div>
      </>
    );
  }

  function determineEndGameToRender() {
    if (draw) return renderDraw();
    if (isCurrPlayer) return renderWinningMessage();
    return renderLosingMessage();
  }
  let endGameMessage = determineEndGameToRender();
  
  return (
    <div className="end-game-message-container">
      {endGameMessage}
    </div>
  );
}

export default EndGameMessage;
