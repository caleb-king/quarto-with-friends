import React, { useRef } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

function Setup() {
  let history = useHistory();
  const gameID = useRef(uuidv4());
  
  // GET FROM CONFIG BASE_URL
  const BASE_URL = 'http://localhost:3000';

  function handleSubmit(e) {
    e.preventDefault();
    history.push(`/${gameID.current}`);

    // const newGame = {
    //   gameId: gameID,
    //   host: e.target['host-name'].value,
    // }
    // fetch(`${config.API_ENDPOINT}/games`, {
    //   method: 'POST',
    //   headers: {
    //     'content-type': 'application/json'
    //   },
    //   body: JSON.stringify(newGame),
    // })
    //   .then(res => {
    //     if (!res.ok)
    //       return res.json().then(e => Promise.reject(e));
    //     return res.json();
    //   })
    //   .then(game => {
    //     props.updateCurrPlayer(game.host);
    //     history.push(`/${game.gameID}`);
    //   })
    //   .catch(error => {
    //     console.error({ error });
    //   });
  }
  
  return (
    <>
      <header>
        <img className="logo" src="/images/quarto-logo.png" alt="Quarto Logo"/>
        <h1>Quarto With Friends</h1>
      </header>
      <main>
        <div className="modal">
          <h2>Set Up Your Game</h2>
          <form id="setup-game" className="setup-game" onSubmit={handleSubmit}>
            <label htmlFor="host-name">1) Enter your name</label>
            <div className="input-container">
              <i className="fas fa-user"></i>
              <input className="host-name" type="text" required />
            </div>
            <label htmlFor="game-id">2) Share this link with your friend</label>
            <div className="input-container">
              <i className="fas fa-share-alt"></i>
              <input 
                type="text" 
                value={`${BASE_URL}${useLocation().pathname}/${gameID.current}`}
                name="game-id"
                readOnly/>
            </div>

            <div className="button-container">
              <button className="button" type="submit">
                BEGIN PLAYING
              </button>
            </div>
          </form>
        </div>
        <img className="ordered-set-of-pieces" src="/images/ordered-set-of-pieces.png" alt="A display of all 16 Quarto pieces"/>
      </main>
    </>
  );
}

export default Setup;
