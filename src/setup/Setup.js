import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { BASE_URL, API_ENDPOINT } from '../config';

function Setup(props) {
  const { setCurrPlayer } = props;
  let history = useHistory();
  const gameId = useRef(uuidv4());

  // STATE
  const [displayCopy, setDisplayCopy] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    const newGame = {
      gameId: gameId.current,
      host: e.target['host-name'].value,
    }
    fetch(`${API_ENDPOINT}/games`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newGame),
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e));
        return res.json();
      })
      .then(game => {
        setCurrPlayer(game.host);
        history.push(`/${game.id}`);
      })
      .catch(error => {
        console.error({ error });
      });
  }
  
  function handleCopyURL() {
    navigator.clipboard.writeText(`${BASE_URL}/${gameId.current}`);
    setDisplayCopy(true);
  }

  return (
    <>
      <header>
        <img className="logo" src="/images/quarto-logo.png" alt="Quarto Logo"/>
        <h1>Quarto With Friends</h1>
      </header>
      <main>
        <div className="modal game-setup-container">
          <h2>Set Up Your Game</h2>
          <form id="setup-game" className="setup-game" onSubmit={handleSubmit}>
            <label htmlFor="host-name">1) Enter your name</label>
            <div className="input-container">
              <i className="fas fa-user"></i>
              <input className="host-name" id="host-name" type="text" required />
            </div>
            <label htmlFor="game-id">2) Share this link with your friend</label>
            <div className="input-container">
              <i className="fas fa-share-alt"></i>
              <input 
                type="text" 
                value={`${BASE_URL}/${gameId.current}`}
                name="game-id"
                readOnly/>
              <button 
                type="button"
                className="copy-button"
                onClick={handleCopyURL}>
                <i className="fas fa-copy"></i>
                {
                  displayCopy &&
                  <p className="copy-success">Copied!</p>
                }
              </button>
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
