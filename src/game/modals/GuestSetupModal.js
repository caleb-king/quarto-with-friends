import React from 'react';

function GuestSetupModal() {
  function handleSubmit(e) {
    e.preventDefault();

    // const updateGuest = {
    //   gameId: gameID,
    //   guest: e.target['guest-name'].value,
    // }
    // fetch(`${config.API_ENDPOINT}/games`, {
    //   method: 'POST',
    //   headers: {
    //     'content-type': 'application/json'
    //   },
    //   body: JSON.stringify(updateGuest),
    // })
    //   .then(res => {
    //     if (!res.ok)
    //       return res.json().then(e => Promise.reject(e));
    //     return res.json();
    //   })
    //   .then(game => {
    //     props.updateCurrPlayer(game.guest);
    //     props.displayHowToPlayModal();
    //   })
    //   .catch(error => {
    //     console.error({ error });
    //   });
  }
  
  return (
    <div className="modal fixed">
      <form id="setup-guest" className="setup-guest" onSubmit={handleSubmit}>
        <label htmlFor="guest-name">Enter your name below</label>
        <div className="input-container">
          <i className="fas fa-user"></i>
          <input className="guest-name" type="text" required />
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
