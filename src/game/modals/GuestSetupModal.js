import React from 'react';
import { useParams } from 'react-router-dom';
import { API_ENDPOINT } from '../../config';

function GuestSetupModal(props) {
  const { setCurrPlayer, setShowHowTo, setGuest } = props;
  const gameId = useParams().gameId;
  
  function handleSubmit(e) {
    e.preventDefault();

    // check that guest name is distinct from host name

    const updateGuest = {
      guest: e.target['guest-name'].value,
    }
    fetch(`${API_ENDPOINT}/games/${gameId}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(updateGuest),
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e));
        return res.json();
      })
      .then((game) => {
        setCurrPlayer(game.guest);
        setShowHowTo(true);
        setGuest(game.guest);
      })
      .catch(error => {
        console.error({ error });
      });
  }
  
  return (
    <div className="modal fixed">
      <form id="setup-guest" className="setup-guest" onSubmit={handleSubmit}>
        <label htmlFor="guest-name">Enter your name below</label>
        <div className="input-container">
          <i className="fas fa-user"></i>
          <input className="guest-name" id="guest-name" type="text" required />
        </div>

        <div className="button-container">
          <button className="button" type="submit">
            BEGIN PLAYING
          </button>
        </div>
      </form>
    </div>
  );
}

export default GuestSetupModal;
