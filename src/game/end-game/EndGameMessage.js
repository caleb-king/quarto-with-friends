import React from 'react';

function EndGameMessage(props) {
  const {isCurrPlayer} = props;
  
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
          <button className="button" type="button">
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
          <button className="button" type="button">
            PLAY AGAIN
          </button>
        </div>
      </>
    );
  }

  const endGameMessage = isCurrPlayer ?
    renderWinningMessage() :
    renderLosingMessage();
  
  return (
    <div className="end-game-message-container">
      {endGameMessage}
    </div>
  );
}

export default EndGameMessage;
